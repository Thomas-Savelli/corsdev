import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, HardDrive, Activity, Matrix } from 'lucide-react';
import useMatrixMode from '../hooks/useMatrixMode';

const DebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    cpu: 0,
    network: 'online'
  });
  const { isMatrixMode, startMatrixMode, stopMatrixMode } = useMatrixMode();

  useEffect(() => {
    const updateStats = () => {
      setStats(prev => ({
        ...prev,
        fps: Math.round(1000 / (performance.now() - prev.lastFrame)),
        memory: Math.round(performance.memory?.usedJSHeapSize / 1048576) || 0,
        cpu: Math.round(Math.random() * 100), // Simulé
        lastFrame: performance.now()
      }));
    };

    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-deadsec-dark border border-deadsec-blue p-2 rounded-sm"
      >
        <Terminal className="text-deadsec-blue w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-deadsec-dark border border-deadsec-blue p-4 rounded-sm w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-deadsec-blue font-mono text-sm">Debug Mode</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-deadsec-purple hover:text-deadsec-blue"
        >
          <Terminal className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-4 h-4 text-deadsec-green mr-2" />
            <span>FPS</span>
          </div>
          <span className="text-deadsec-purple">{stats.fps}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <HardDrive className="w-4 h-4 text-deadsec-blue mr-2" />
            <span>Memory</span>
          </div>
          <span className="text-deadsec-purple">{stats.memory} MB</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Cpu className="w-4 h-4 text-deadsec-red mr-2" />
            <span>CPU</span>
          </div>
          <span className="text-deadsec-purple">{stats.cpu}%</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-deadsec-blue/20">
        <button
          onClick={() => isMatrixMode ? stopMatrixMode() : startMatrixMode()}
          className={`
            w-full py-2 px-4 flex items-center justify-center space-x-2
            border transition-colors
            ${isMatrixMode 
              ? 'border-deadsec-green text-deadsec-green' 
              : 'border-deadsec-blue text-deadsec-blue'
            }
            hover:border-deadsec-purple hover:text-deadsec-purple
          `}
        >
          <Terminal className="w-4 h-4" />
          <span>{isMatrixMode ? 'Désactiver Matrix' : 'Activer Matrix'}</span>
        </button>
      </div>
    </div>
  );
};

export default DebugPanel; 