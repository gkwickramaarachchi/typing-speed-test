
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TextToSpeechProps {
  text: string;
  disabled?: boolean;
}

const TextToSpeech = ({ text, disabled }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        return;
      }

      setIsPlaying(true);
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVEN_LABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
      };

      newAudio.play();
      setAudio(newAudio);
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to generate speech. Please try again.');
      setIsPlaying(false);
    }
  };

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
