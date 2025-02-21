
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
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && !isPlaying && !disabled) {
      handleSpeak();
    }
  }, [autoPlay, disabled]);

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
      const newUtterance = new SpeechSynthesisUtterance(text);
      
      // Set properties for the speech
      newUtterance.rate = 1.0; // Speech speed
      newUtterance.pitch = 1.0; // Speech pitch
      newUtterance.volume = 1.0; // Speech volume
      
      // Handle speech end
      newUtterance.onend = () => {
        setIsPlaying(false);
      };

      // Handle speech error
      newUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        toast.error('Failed to generate speech. Please try again.');
        setIsPlaying(false);
      };

      setUtterance(newUtterance);
      setIsPlaying(true);
      speechSynthesis.speak(newUtterance);
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to generate speech. Please try again.');
      setIsPlaying(false);
    }
  };

  // Cancel any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

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
