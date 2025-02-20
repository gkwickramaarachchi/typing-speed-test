
import React from "react";
import { KEYBOARD_LAYOUT } from "@/constants/typingTest";

interface VirtualKeyboardProps {
  activeKeys: Set<string>;
}

const VirtualKeyboard = ({ activeKeys }: VirtualKeyboardProps) => {
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

export default VirtualKeyboard;
