
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Play, Square } from "lucide-react";
import VirtualKeyboard from "./typing/VirtualKeyboard";
import ResultsDialog from "./typing/ResultsDialog";
import TestControls from "./typing/TestControls";
import TimerOptions from "./typing/TimerOptions";
import TestStats from "./typing/TestStats";
import CustomTextInput from "./typing/CustomTextInput";
import { TEXT_SAMPLES } from "@/constants/typingTest";
import { calculateStats, calculateSuggestedTime } from "@/utils/typingTestUtils";
import { toast } from "sonner";

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
  const [customText, setCustomText] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [autoPlaySpeech, setAutoPlaySpeech] = useState(false);
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
    if (!isCustomMode) {
      const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
      setText(TEXT_SAMPLES[selectedTime][randomIndex]);
    }
  }, [selectedTime, isCustomMode]);

  const handleCustomTextSubmit = () => {
    if (customText.trim().length < 10) {
      toast.error("Custom text must be at least 10 characters long");
      return;
    }
    setText(customText.trim());
    setIsCustomMode(true);
    const suggestedTime = calculateSuggestedTime(customText);
    setSelectedTime(suggestedTime);
    setTimeLeft(suggestedTime);
    toast.success(`Timer set to ${suggestedTime} seconds based on text length`);
  };

  const handleUseDefaultText = () => {
    setIsCustomMode(false);
    setCustomText("");
    const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
    setText(TEXT_SAMPLES[selectedTime][randomIndex]);
  };

  const startTest = () => {
    if (!isActive && !isFinished) {
      if (selectedTime < 1) return;
      
      if (!isCustomMode) {
        const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
        setText(TEXT_SAMPLES[selectedTime][randomIndex]);
      }
      
      setTimeLeft(selectedTime);
      setInput("");
      setActiveKeys(new Set());
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
      
      setIsActive(true);
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
    if (!isCustomMode) {
      const randomIndex = Math.floor(Math.random() * TEXT_SAMPLES[selectedTime].length);
      setText(TEXT_SAMPLES[selectedTime][randomIndex]);
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
        {!isActive && !isFinished && (
          <CustomTextInput
            customText={customText}
            setCustomText={setCustomText}
            handleCustomTextSubmit={handleCustomTextSubmit}
            handleUseDefaultText={handleUseDefaultText}
            isActive={isActive}
          />
        )}

        <div className="flex items-center justify-between">
          <TestControls
            timeLeft={timeLeft}
            resetTest={resetTest}
            text={text}
            isActive={isActive}
            autoPlaySpeech={autoPlaySpeech}
            setAutoPlaySpeech={setAutoPlaySpeech}
          />
          
          {!isCustomMode && (
            <TimerOptions
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}

          <TestStats wpm={wpm} cpm={cpm} accuracy={accuracy} />
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
