import { useEffect } from 'react';
import useMatrixMode from './useMatrixMode';
import useSoundSystem from './useSoundSystem';

const useEasterEggs = () => {
  const { startMatrixMode, stopMatrixMode, isMatrixMode } = useMatrixMode();
  const { playSound } = useSoundSystem();

  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const matrix = ['m', 'a', 't', 'r', 'i', 'x'];
    const dedsec = ['d', 'e', 'd', 's', 'e', 'c'];
    let sequence = [];

    const handleKeydown = (e) => {
      // Arrêter le mode Matrix avec la touche Escape
      if (e.key === 'Escape' && isMatrixMode) {
        playSound('glitch');
        stopMatrixMode();
        return;
      }

      sequence.push(e.key.toLowerCase());
      sequence = sequence.slice(-Math.max(konami.length, matrix.length, dedsec.length));

      // Konami Code
      if (sequence.join(',') === konami.join(',')) {
        playSound('success');
        if (!isMatrixMode) {
          startMatrixMode();
          setTimeout(stopMatrixMode, 10000);
        }
      }

      // Matrix Code
      if (sequence.join('') === matrix.join('')) {
        if (isMatrixMode) {
          playSound('glitch');
          stopMatrixMode();
        } else {
          playSound('hack');
          startMatrixMode();
        }
      }

      // DedSec Code
      if (sequence.join('') === dedsec.join('')) {
        playSound('glitch');
        document.body.classList.add('ultra-glitch');
        setTimeout(() => document.body.classList.remove('ultra-glitch'), 5000);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [startMatrixMode, stopMatrixMode, playSound, isMatrixMode]);
};

export default useEasterEggs; 