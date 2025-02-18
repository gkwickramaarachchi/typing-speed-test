import React, { useState, useEffect, useCallback } from "react";
import { Clock, RotateCcw, Play, Square } from "lucide-react";

const TEXT_SAMPLES = [
  `The quick brown fox jumps over the lazy dog. Technology continues to evolve at an unprecedented pace, transforming how we live and work. Innovation drives progress, pushing boundaries and creating new possibilities. Each day brings fresh challenges and opportunities for growth.`,
  `As the sun sets behind the mountains, casting long shadows across the valley, a gentle breeze rustles through the autumn leaves. The changing seasons bring a symphony of colors, from vibrant reds to deep golds, painting nature's canvas with stunning beauty. In these quiet moments, we find peace in the world's natural rhythm.`,
  `Scientists explore the frontiers of space, uncovering mysteries that have puzzled humanity for centuries. Each discovery brings us closer to understanding our place in the vast cosmos. Through advanced telescopes and space probes, we peer deeper into the universe, revealing new worlds and possibilities.`,
  `The digital revolution has transformed the way we communicate, learn, and interact with the world around us. Social media platforms connect people across continents, while artificial intelligence reshapes industries and everyday experiences. As technology advances, we must consider its impact on society and human relationships.`
];

const TIMER_OPTIONS = [
  { label: "30s", value: 30 },
  { label: "1m", value: 60 },
  { label: "2m", value: 120 },
  { label: "5m", value: 300 },
];

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const TypingTest = () => {
  const [text, setText] = useState(TEXT_SAMPLES[0]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [customTime, setCustomTime] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const calculateStats = useCallback(() => {
    const words = input.trim().split(" ").length;
    const characters = input.length;
    const correctCharacters = [...input].filter(
      (char, i) => char === text[i]
    ).length;
    const currentAccuracy = (correctCharacters / characters) * 100 || 0;
    const timeSpent = selectedTime - timeLeft;
    const minutesSpent = timeSpent / 60;
    const currentWpm = Math.round(words / minutesSpent) || 0;
    const currentCpm = Math.round(characters / minutesSpent) || 0;

    setWpm(currentWpm);
    setCpm(currentCpm);
    setAccuracy(Math.round(currentAccuracy));
  }, [input, text, timeLeft, selectedTime]);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsFinished(true);
            calculateStats();
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, calculateStats]);

  useEffect(() => {
    if (isActive) {
      calculateStats();
    }
  }, [isActive, input, calculateStats]);

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

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && Number(value) <= 3600) {
      setCustomTime(value);
      if (value) {
        setSelectedTime(Number(value));
      }
    }
  };

  const handleStart = () => {
    if (!isActive && !isFinished) {
      if (selectedTime < 1) {
        return;
      }
      const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES.length);
      setText(TEXT_SAMPLES[randomIndex]);
      setTimeLeft(selectedTime);
      setIsActive(true);
      setInput("");
      setActiveKeys(new Set());
    }
  };

  const handleFinish = () => {
    if (isActive || timeLeft <= 1) {
      setIsActive(false);
      setIsFinished(true);
      calculateStats();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isActive) {
      setInput(e.target.value);
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
    const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES.length);
    setText(TEXT_SAMPLES[randomIndex]);
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

  const renderKeyboard = () => {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 mb-1">
            {row.map((key) => (
              <div
                key={key}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                  activeKeys.has(key)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {key.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-1">
          <div
            className={`w-64 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
              activeKeys.has(" ")
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            SPACE
          </div>
        </div>
      </div>
    );
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
            <input
              type="text"
              value={customTime}
              onChange={handleCustomTimeChange}
              placeholder="Custom time (seconds)"
              className="px-3 py-1 w-40 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"
              disabled={isActive}
            />
            <div className="flex space-x-2">
              {TIMER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedTime(option.value);
                    setCustomTime("");
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedTime === option.value && !customTime
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
            value={input}
            onChange={handleInput}
            disabled={!isActive || isFinished}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            autoFocus
          />
        </div>

        {renderKeyboard()}

        {isFinished && (
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Test Results</h2>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600">{wpm}</p>
                <p className="text-sm text-gray-600 mt-1">Words per Minute</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">{cpm}</p>
                <p className="text-sm text-gray-600 mt-1">Characters per Minute</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">{accuracy}%</p>
                <p className="text-sm text-gray-600 mt-1">Accuracy</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Characters typed:</span>
                <span className="font-medium">{input.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Correct characters:</span>
                <span className="font-medium">
                  {[...input].filter((char, i) => char === text[i]).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Time taken:</span>
                <span className="font-medium">{selectedTime - timeLeft}s</span>
              </div>
              <div className="flex justify-between">
                <span>Time limit:</span>
                <span className="font-medium">{selectedTime}s</span>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={resetTest}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!isActive && !isFinished && (
          <div className="flex justify-center">
            <button
              onClick={handleStart}
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
              onClick={handleFinish}
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
