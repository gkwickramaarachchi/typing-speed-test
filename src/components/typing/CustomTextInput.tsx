
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CustomTextInputProps {
  customText: string;
  setCustomText: (text: string) => void;
  handleCustomTextSubmit: () => void;
  handleUseDefaultText: () => void;
  isActive: boolean;
}

const CustomTextInput = ({
  customText,
  setCustomText,
  handleCustomTextSubmit,
  handleUseDefaultText,
  isActive,
}: CustomTextInputProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter or paste your custom text here..."
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        className="min-h-[100px] w-full"
        disabled={isActive}
      />
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={handleUseDefaultText} disabled={isActive}>
          Use Default Text
        </Button>
        <Button onClick={handleCustomTextSubmit} disabled={isActive || customText.trim().length < 10}>
          Use Custom Text
        </Button>
      </div>
    </div>
  );
};

export default CustomTextInput;
