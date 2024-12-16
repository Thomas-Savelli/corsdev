import { useState, useCallback, useEffect } from 'react';
import useSoundSystem from './useSoundSystem';

const useMatrixMode = () => {
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const { playSound, stopSound } = useSoundSystem();

  const startMatrixMode = useCallback(() => {
    setIsMatrixMode(true);
    playSound('matrix', { loop: true, volume: 0.2 });
    document.body.classList.add('matrix-mode');
    
    // Ajouter des caractères Matrix qui tombent
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1000';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.8';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#&%';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const matrixInterval = setInterval(draw, 33);

    return () => {
      clearInterval(matrixInterval);
      document.body.removeChild(canvas);
    };
  }, [playSound]);

  const stopMatrixMode = useCallback(() => {
    setIsMatrixMode(false);
    stopSound('matrix');
    document.body.classList.remove('matrix-mode');
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
      document.body.removeChild(canvas);
    }
  }, [stopSound]);

  useEffect(() => {
    return () => {
      stopMatrixMode();
    };
  }, [stopMatrixMode]);

  return { isMatrixMode, startMatrixMode, stopMatrixMode };
};

export default useMatrixMode; 