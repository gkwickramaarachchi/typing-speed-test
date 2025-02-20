
export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
};

export const calculateStats = (input: string, text: string, timeLeft: number, selectedTime: number) => {
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

  return {
    wpm: currentWpm,
    cpm: currentCpm,
    accuracy: Math.round(currentAccuracy)
  };
};

export const calculateSuggestedTime = (text: string) => {
  // Average reading speed is about 200-250 words per minute
  // We'll use 200 WPM as a baseline for typing tests
  const words = text.trim().split(/\s+/).length;
  const suggestedMinutes = words / 200;
  const suggestedSeconds = Math.max(30, Math.min(300, Math.ceil(suggestedMinutes * 60)));
  // Return between 30 seconds and 5 minutes
  return suggestedSeconds;
};
