
import React from "react";
import { TIMER_OPTIONS } from "@/constants/typingTest";

interface TimerOptionsProps {
  selectedTime: number;
  setSelectedTime: (time: number) => void;
}

const TimerOptions = ({ selectedTime, setSelectedTime }: TimerOptionsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2">
        {TIMER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedTime(option.value)}
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
  );
};

export default TimerOptions;
