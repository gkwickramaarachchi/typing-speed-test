
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Clock, RotateCcw, Play, Square } from "lucide-react";
import VirtualKeyboard from "./typing/VirtualKeyboard";
import ResultsDialog from "./typing/ResultsDialog";
import { TEXT_SAMPLES, TIMER_OPTIONS } from "@/constants/typingTest";
import { calculateStats } from "@/utils/typingTestUtils";

const TypingTest = () => {
  const [text, setText] = useState(TEXT_SAMPLES[60][0]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateStats = useCallback(() => {
    const stats = calculateStats(input, text, timeLeft, selectedTime);
    setWpm(stats.wpm);
    setCpm(stats.cpm);
    setAccuracy(stats.accuracy);
  }, [input, text, timeLeft, selectedTime]);

  const finishTest = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    updateStats();
  }, [updateStats]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
    setText(TEXT_SAMPLES[selectedTime][randomIndex]);
  }, [selectedTime]);

  const startTest = () => {
    if (!isActive && !isFinished) {
      if (selectedTime < 1) return;
      
      const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
      setText(TEXT_SAMPLES[selectedTime][randomIndex]);
      setTimeLeft(selectedTime);
      setInput("");
      setActiveKeys(new Set());
      
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      
      setIsActive(true);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            finishTest();
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, finishTest]);

  useEffect(() => {
    if (isActive) {
      updateStats();
    }
  }, [isActive, input, updateStats]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) {
        setActiveKeys((prev) => new Set([...prev, e.key.toLowerCase()]));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isActive) {
        setActiveKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(e.key.toLowerCase());
          return newSet;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isActive) {
      setInput(e.target.value);
      if (e.target.value.length === text.length) {
        finishTest();
      }
    }
  };

  const resetTest = () => {
    setInput("");
    setTimeLeft(selectedTime);
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
    setText(TEXT_SAMPLES[selectedTime][randomIndex]);
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
      <div className="w-full max-w-4xl space-y-8">
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
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {TIMER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedTime(option.value);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedTime === option.value
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">WPM</p>
              <p className="text-xl font-mono">{wpm}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">CPM</p>
              <p className="text-xl font-mono">{cpm}</p>
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
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            disabled={!isActive || isFinished}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            autoFocus={isActive}
          />
        </div>

        <VirtualKeyboard activeKeys={activeKeys} />

        <ResultsDialog
          isOpen={isFinished}
          onClose={resetTest}
          stats={{
            selectedTime,
            timeLeft,
            wpm,
            accuracy,
            input,
            text
          }}
        />

        {!isActive && !isFinished && (
          <div className="flex justify-center">
            <button
              onClick={startTest}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Test</span>
            </button>
          </div>
        )}
        
        {isActive && (
          <div className="flex justify-center">
            <button
              onClick={finishTest}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>Finish Test</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
