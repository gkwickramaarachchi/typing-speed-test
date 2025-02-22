
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TextToSpeechProps {
  text: string;
  disabled?: boolean;
  autoPlay?: boolean;
}

const TextToSpeech = ({ text, disabled, autoPlay }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleSpeak = () => {
    if (!speechSynthesis) {
      toast.error('Speech synthesis is not supported in your browser');
      return;
    }

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    try {
      // Cancel any existing speech
      speechSynthesis.cancel();
      
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.rate = 1.0;
      newUtterance.pitch = 1.0;
      newUtterance.volume = 1.0;
      
      newUtterance.onend = () => {
        setIsPlaying(false);
      };

      newUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        toast.error('Failed to generate speech. Please try again.');
        setIsPlaying(false);
      };

      setIsPlaying(true);
      speechSynthesis.speak(newUtterance);
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to generate speech. Please try again.');
      setIsPlaying(false);
    }
  };

  // Handle auto-play
  useEffect(() => {
    if (autoPlay && text && !disabled && !isPlaying && speechSynthesis) {
      // Small delay to ensure proper initialization
      const timer = setTimeout(() => {
        handleSpeak();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, text, disabled, speechSynthesis]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      }
    };
  }, [speechSynthesis]);

  // Handle disabled state
  useEffect(() => {
    if (disabled && speechSynthesis && isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [disabled, speechSynthesis, isPlaying]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleSpeak}
      disabled={disabled}
      className="rounded-full"
      title={isPlaying ? "Stop Speaking" : "Speak Text"}
    >
      {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  );
};

export default TextToSpeech;
