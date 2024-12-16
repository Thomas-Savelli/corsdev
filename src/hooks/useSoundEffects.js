import { useCallback } from 'react';

const useSoundEffects = () => {
  const sounds = {
    hover: new Audio('/sounds/hover.mp3'),
    click: new Audio('/sounds/click.mp3'),
    success: new Audio('/sounds/success.mp3'),
    error: new Audio('/sounds/error.mp3'),
    hack: new Audio('/sounds/hack.mp3'),
    glitch: new Audio('/sounds/glitch.mp3'),
  };

  // Précharger les sons
  Object.values(sounds).forEach(sound => {
    sound.load();
    sound.volume = 0.3;
  });

  const playSound = useCallback((soundName) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }, []);

  return { playSound };
};

export default useSoundEffects; 