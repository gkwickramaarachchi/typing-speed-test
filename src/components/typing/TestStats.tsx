
import React from "react";

interface TestStatsProps {
  wpm: number;
  cpm: number;
  accuracy: number;
}

const TestStats = ({ wpm, cpm, accuracy }: TestStatsProps) => {
  return (
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
  );
};

export default TestStats;
