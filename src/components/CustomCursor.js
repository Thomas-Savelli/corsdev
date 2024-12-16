import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e) => {
      const isHoverable = e.target.closest('button, a, input, textarea');
      setIsHovered(!!isHoverable);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', updateHoverState);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <div
      className={`
        fixed pointer-events-none z-[100]
        transition-all duration-75 ease-out
        ${isHovered ? 'scale-125' : 'scale-100'}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
        width: '12px',
        height: '12px',
        imageRendering: 'pixelated',
        background: `
          linear-gradient(45deg, transparent 25%, #00fff9 25%, #00fff9 75%, transparent 75%),
          linear-gradient(45deg, #FF00FF 25%, transparent 25%, transparent 75%, #FF00FF 75%)
        `,
        clipPath: 'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)'
      }}
    />
  );
};

export default CustomCursor; 