import React from 'react';
import { Terminal, Cpu } from 'lucide-react';

const GameSelector = ({ onSelectGame }) => {
  const games = [
    {
      id: 'matrix',
      title: 'Matrix Hack',
      icon: Terminal,
      description: 'Hackez le système en trouvant le code secret'
    },
    {
      id: 'memory',
      title: 'Memory Hack',
      icon: Cpu,
      description: 'Testez votre mémoire en reproduisant les séquences'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map(game => (
        <button 
          key={game.id}
          onClick={() => onSelectGame(game.id)}
          className="bg-deadsec-dark p-6 border border-deadsec-blue text-left hover:bg-deadsec-blue/5 hover:border-deadsec-purple transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <game.icon className="w-8 h-8 text-deadsec-blue" />
            <div>
              <h3 className="text-deadsec-blue font-mono text-lg mb-2">
                {game.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {game.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default GameSelector; 