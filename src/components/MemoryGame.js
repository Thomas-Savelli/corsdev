import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Cpu, Wifi, Database, Lock, Code, Cloud } from 'lucide-react';

const MemoryGame = ({ onReturn }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(60);

  const icons = [
    { icon: Shield, color: 'deadsec-blue' },
    { icon: Terminal, color: 'deadsec-purple' },
    { icon: Cpu, color: 'deadsec-blue' },
    { icon: Wifi, color: 'deadsec-purple' },
    { icon: Database, color: 'deadsec-blue' },
    { icon: Lock, color: 'deadsec-purple' },
    { icon: Code, color: 'deadsec-blue' },
    { icon: Cloud, color: 'deadsec-purple' }
  ];

  const initializeGame = () => {
    const shuffledIcons = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        icon: item.icon,
        color: item.color,
        isFlipped: false,
        isSolved: false
      }));
    setCards(shuffledIcons);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  const handleCardClick = (cardId) => {
    if (gameState !== 'playing') return;
    if (flipped.length === 2) return;
    if (flipped.includes(cardId)) return;
    if (solved.includes(cardId)) return;

    setFlipped(prev => [...prev, cardId]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = flipped;
      
      if (cards[first].icon === cards[second].icon) {
        setSolved(prev => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setGameState('success');
    }
  }, [solved, cards]);

  useEffect(() => {
    let timer;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const renderCard = (card) => {
    const Icon = card.icon;
    const isCardFlipped = flipped.includes(card.id) || solved.includes(card.id);

    return (
      <button
        key={card.id}
        onClick={() => handleCardClick(card.id)}
        className={`
          aspect-square p-4 border rounded-sm transition-all duration-300
          ${isCardFlipped 
            ? `bg-deadsec-dark border-${card.color}` 
            : 'bg-deadsec-dark/50 border-deadsec-blue/30 hover:border-deadsec-blue'}
        `}
        disabled={isCardFlipped || gameState !== 'playing'}
      >
        <div className={`
          w-full h-full flex items-center justify-center
          transition-all duration-300
          ${isCardFlipped ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}
        `}>
          <Icon className={`w-8 h-8 text-${card.color}`} />
        </div>
      </button>
    );
  };

  return (
    <div className="bg-deadsec-dark border border-deadsec-purple/30 p-6 rounded-sm relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-mono text-deadsec-purple">Neural Network Hack</h3>
        <button
          onClick={onReturn}
          className="px-4 py-2 text-deadsec-blue hover:text-deadsec-purple transition-colors font-mono border border-deadsec-blue hover:border-deadsec-purple"
        >
          Retour
        </button>
      </div>

      <div className="space-y-6">
        {gameState === 'idle' && (
          <button
            onClick={initializeGame}
            className="w-full py-3 border border-deadsec-purple text-deadsec-purple hover:bg-deadsec-purple/10 transition-colors"
          >
            Commencer le Hack
          </button>
        )}

        {gameState === 'playing' && (
          <>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-deadsec-purple">Coups: {moves}</span>
              <span className="text-deadsec-blue">Temps: {timeLeft}s</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {cards.map(card => renderCard(card))}
            </div>
          </>
        )}

        {gameState === 'success' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-purple text-xl">Réseau Neural Hacké !</div>
            <div className="text-gray-400">Coups utilisés : {moves}</div>
            <button
              onClick={initializeGame}
              className="px-4 py-2 border border-deadsec-purple text-deadsec-purple hover:bg-deadsec-purple/10 transition-colors"
            >
              Rejouer
            </button>
          </div>
        )}

        {gameState === 'failed' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-purple text-xl">Temps écoulé !</div>
            <button
              onClick={initializeGame}
              className="px-4 py-2 border border-deadsec-purple text-deadsec-purple hover:bg-deadsec-purple/10 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame; 