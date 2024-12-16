import { useCallback, useEffect, useRef } from 'react';

const useSoundSystem = () => {
  const sounds = useRef({
    hover: new Audio('/sounds/hover.mp3'),
    click: new Audio('/sounds/click.mp3'),
    hack: new Audio('/sounds/hack.mp3'),
    success: new Audio('/sounds/success.mp3'),
    error: new Audio('/sounds/error.mp3'),
    typing: new Audio('/sounds/typing.mp3'),
    glitch: new Audio('/sounds/glitch.mp3'),
    matrix: new Audio('/sounds/matrix.mp3'),
    notification: new Audio('/sounds/notification.mp3')
  });

  const soundEnabled = useRef(false);

  useEffect(() => {
    // Précharger tous les sons
    Object.values(sounds.current).forEach(sound => {
      sound.load();
      sound.volume = 0.3;
    });

    // Activer le son au premier clic utilisateur
    const enableSound = () => {
      soundEnabled.current = true;
      document.removeEventListener('click', enableSound);
    };
    document.addEventListener('click', enableSound);

    return () => document.removeEventListener('click', enableSound);
  }, []);

  const playSound = useCallback((soundName, options = {}) => {
    if (!soundEnabled.current) return;

    const sound = sounds.current[soundName];
    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = options.volume || 0.3;
    if (options.loop) sound.loop = true;
    
    sound.play().catch(() => {});

    if (options.duration) {
      setTimeout(() => {
        sound.pause();
        sound.loop = false;
      }, options.duration);
    }
  }, []);

  const stopSound = useCallback((soundName) => {
    const sound = sounds.current[soundName];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.loop = false;
    }
  }, []);

  return { playSound, stopSound };
};

export default useSoundSystem; 