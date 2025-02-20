import React, { useState, useEffect, useCallback, useRef } from "react";
import { Clock, RotateCcw, Play, Square, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TEXT_SAMPLES = {
  30: [
    `The quick brown fox jumps over the lazy dog. This short text is designed for a 30-second typing test, allowing users to focus on accuracy and speed in a brief session.`,
    `Programming requires attention to detail and precise typing skills. Each character matters when writing code, making accuracy essential for developers.`,
    `Practice makes perfect when it comes to typing. Regular short sessions help build muscle memory and improve overall typing performance.`
  ],
  60: [
    `As technology continues to evolve, typing skills become increasingly important in our digital world. The ability to type quickly and accurately enhances productivity and communication efficiency. Modern workplaces demand proficient typing abilities.`,
    `Learning to type properly involves maintaining the correct posture and finger placement. Keep your fingers on the home row keys and practice regularly to build muscle memory. Focus on accuracy before increasing your speed.`,
    `The art of touch typing requires dedication and consistent practice. Start with the home row keys and gradually build up your speed while maintaining accuracy. Remember that proper technique is more important than raw speed.`
  ],
  120: [
    `In the realm of computer programming, efficient typing is a valuable skill that enhances productivity. Developers spend countless hours writing code, debugging applications, and documenting their work. The ability to type quickly and accurately can significantly impact their workflow. Modern integrated development environments (IDEs) offer powerful features that complement strong typing abilities.`,
    `The digital age has transformed how we interact with computers and devices. From social media communications to professional emails, typing has become an essential skill in both personal and professional contexts. As technology continues to advance, the importance of efficient typing grows. Regular practice and proper technique contribute to improved typing speed and accuracy.`,
    `Learning to type efficiently involves understanding proper finger placement and developing muscle memory. The home row keys serve as anchors for touch typing, with each finger responsible for specific keys. Practice sessions should focus on accuracy before speed, allowing proper technique to become natural and automatic. Consistent practice leads to improved performance.`
  ],
  300: [
    `The evolution of technology has fundamentally changed how we work and communicate in the modern world. From the early days of mechanical typewriters to today's advanced computing systems, the ability to type efficiently has become increasingly crucial. Professional environments demand quick and accurate typing skills, whether for content creation, programming, or general communication. Understanding proper typing technique and maintaining good habits can significantly impact productivity and reduce the risk of repetitive strain injuries. Regular practice sessions, combined with attention to posture and finger placement, help develop these essential skills. The digital age continues to emphasize the importance of proficient typing abilities across various professional fields and personal activities. As we progress further into the technological era, these skills become even more valuable for success in both academic and professional environments. The investment in developing strong typing abilities pays dividends throughout one's career and daily digital interactions.`,
    `In the world of software development and computer programming, typing efficiency plays a crucial role in productivity and code quality. Developers spend significant time writing code, documenting features, and communicating with team members through various digital platforms. The ability to type quickly and accurately can significantly impact their workflow and output quality. Modern integrated development environments (IDEs) offer powerful features that complement strong typing abilities, enabling developers to focus more on problem-solving and less on the mechanical aspects of coding. Version control systems, code reviews, and collaborative development practices all benefit from efficient typing skills. As programming languages and development tools continue to evolve, the foundation of solid typing abilities remains crucial for professional success in the technology sector. Regular practice and proper technique contribute to improved coding speed and accuracy, ultimately enhancing overall development productivity.`,
    `The digital revolution has transformed how we interact with computers and mobile devices in both personal and professional contexts. From social media communications to business emails, typing has become an essential skill that impacts daily productivity and effectiveness. Learning to type efficiently involves understanding proper finger placement and developing muscle memory through consistent practice. The home row keys serve as anchors for touch typing, with each finger responsible for specific keys on the keyboard. This systematic approach to typing helps build speed and accuracy over time, reducing errors and improving overall efficiency. As technology continues to advance, the importance of strong typing skills grows increasingly significant. Whether in academic settings, professional environments, or personal communication, the ability to type quickly and accurately enhances digital literacy and communication effectiveness. Regular practice sessions, focusing first on accuracy and then on speed, help develop these crucial skills for success in the modern digital world.`
  ]
};

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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return { hours, minutes, seconds: remainingSeconds };
  };

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

  const finishTest = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    calculateStats();
  }, [calculateStats]);

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

  const renderKeyboard = () => {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2 mb-2">
            {row.map((key) => (
              <div
                key={key}
                className={`w-16 h-16 flex items-center justify-center rounded-lg font-medium text-xl transition-colors ${
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
        <div className="flex justify-center mt-2">
          <div
            className={`w-96 h-16 flex items-center justify-center rounded-lg font-medium text-xl transition-colors ${
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

        {renderKeyboard()}

        <Dialog open={isFinished} onOpenChange={(open) => !open && resetTest()}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                Test Results
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="text-2xl font-mono">
                    {formatTime(selectedTime - timeLeft).hours}
                  </div>
                  <div className="text-sm text-gray-500">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-mono">
                    {formatTime(selectedTime - timeLeft).minutes}
                  </div>
                  <div className="text-sm text-gray-500">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-mono">
                    {formatTime(selectedTime - timeLeft).seconds}
                  </div>
                  <div className="text-sm text-gray-500">Seconds</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">WPM</div>
                  <div className="text-2xl font-bold text-blue-600">{wpm}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">Time Left</div>
                  <div className="text-2xl font-bold text-purple-600">{timeLeft}s</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">Characters</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {[...input].filter((char, i) => char === text[i]).length}/
                    {input.length}
                  </div>
                </div>
              </div>

              <button
                onClick={resetTest}
                className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>

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
