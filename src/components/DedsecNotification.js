import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

const DedsecNotification = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-deadsec-dark border border-deadsec-blue p-4 animate-slideIn z-50">
      <div className="flex items-center space-x-3">
        <Shield className="text-deadsec-green w-5 h-5 animate-pulse" />
        <p className="font-mono text-sm text-deadsec-blue">{message}</p>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-deadsec-purple hover:text-deadsec-blue transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-deadsec-blue">
        <div 
          className="h-full bg-deadsec-purple animate-progress"
          style={{ animationDuration: `${duration}ms` }}
        ></div>
      </div>
    </div>
  );
};

export default DedsecNotification; 