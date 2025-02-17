import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Clock, RotateCcw, Play, Square } from "lucide-react";

const TIMER_DURATION = 60; // 60 seconds typing test
const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. Technology continues to evolve at an unprecedented pace, transforming how we live and work. Innovation drives progress, pushing boundaries and creating new possibilities. Each day brings fresh challenges and opportunities for growth.";

const TypingTest = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const { toast } = useToast();

  const calculateStats = useCallback(() => {
    const words = input.trim().split(" ").length;
    const characters = input.length;
    const correctCharacters = [...input].filter(
      (char, i) => char === text[i]
    ).length;
    const currentAccuracy = (correctCharacters / characters) * 100 || 0;
    const currentWpm = Math.round((words / (TIMER_DURATION - timeLeft)) * 60);

    setWpm(currentWpm);
    setAccuracy(Math.round(currentAccuracy));
  }, [input, text, timeLeft]);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsFinished(true);
            toast({
              title: "Time's up!",
              description: `WPM: ${wpm} | Accuracy: ${accuracy}%`,
            });
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, toast, wpm, accuracy]);

  useEffect(() => {
    if (isActive) {
      calculateStats();
    }
  }, [isActive, input, calculateStats]);

  const handleStart = () => {
    if (!isActive && !isFinished) {
      setIsActive(true);
      toast({
        title: "Test started!",
        description: "Start typing to begin...",
      });
    }
  };

  const handleFinish = () => {
    if (isActive) {
      setIsActive(false);
      setIsFinished(true);
      calculateStats();
      const finalWpm = Math.round((input.trim().split(" ").length / (TIMER_DURATION - timeLeft)) * 60);
      const correctCharacters = [...input].filter((char, i) => char === text[i]).length;
      const finalAccuracy = Math.round((correctCharacters / input.length) * 100) || 0;
      
      toast({
        title: "🎯 Test Results",
        description: (
          <div className="space-y-2">
            <p className="font-semibold">Words per Minute: {finalWpm} WPM</p>
            <p className="font-semibold">Accuracy: {finalAccuracy}%</p>
            <p className="text-sm text-gray-500 mt-2">
              Characters typed: {input.length}
              <br />
              Correct characters: {correctCharacters}
            </p>
          </div>
        ),
        duration: 5000, // Show for 5 seconds
      });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isActive) {
      setInput(e.target.value);
    }
  };

  const resetTest = () => {
    setInput("");
    setTimeLeft(TIMER_DURATION);
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    toast({
      title: "Test reset",
      description: "Ready for a new attempt!",
    });
  };

  const renderText = () => {
    return text.split("").map((char, index) => {
      let color = "text-gray-500";
      if (index < input.length) {
        color = input[index] === char ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={index} className={color}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-xl font-mono">{timeLeft}s</span>
            </div>
            <button
              onClick={resetTest}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              title="Reset test"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">WPM</p>
              <p className="text-xl font-mono">{wpm}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-xl font-mono">{accuracy}%</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="p-6 rounded-lg bg-white shadow-sm font-mono text-lg leading-relaxed mb-4 min-h-[200px]">
            {renderText()}
          </div>
          <textarea
            value={input}
            onChange={handleInput}
            disabled={!isActive || isFinished}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            autoFocus
          />
        </div>

        <div className="flex justify-center space-x-4">
          {!isActive && !isFinished && (
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Test</span>
            </button>
          )}
          {isActive && (
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>Finish Test</span>
            </button>
          )}
        </div>

        {isFinished && (
          <div className="text-center">
            <button
              onClick={resetTest}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
