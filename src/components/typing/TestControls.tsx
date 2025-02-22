
import React from "react";
import { Clock, RotateCcw } from "lucide-react";
import TextToSpeech from "./TextToSpeech";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TestControlsProps {
  timeLeft: number;
  resetTest: () => void;
  text: string;
  isActive: boolean;
  autoPlaySpeech: boolean;
  setAutoPlaySpeech: (value: boolean) => void;
}

const TestControls = ({
  timeLeft,
  resetTest,
  text,
  isActive,
  autoPlaySpeech,
  setAutoPlaySpeech,
}: TestControlsProps) => {
  return (
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
      <TextToSpeech 
        text={text} 
        disabled={!isActive} 
        autoPlay={isActive && autoPlaySpeech} 
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="autoPlaySpeech"
          checked={autoPlaySpeech}
          onCheckedChange={(checked) => setAutoPlaySpeech(checked as boolean)}
          disabled={isActive}
        />
        <Label htmlFor="autoPlaySpeech">Auto-play speech on start</Label>
      </div>
    </div>
  );
};

export default TestControls;
