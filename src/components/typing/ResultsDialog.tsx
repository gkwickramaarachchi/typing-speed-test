
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatTime } from "@/utils/typingTestUtils";

interface ResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    selectedTime: number;
    timeLeft: number;
    wpm: number;
    accuracy: number;
    input: string;
    text: string;
  };
}

const ResultsDialog = ({ isOpen, onClose, stats }: ResultsDialogProps) => {
  const { selectedTime, timeLeft, wpm, accuracy, input, text } = stats;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
            onClick={onClose}
            className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsDialog;
