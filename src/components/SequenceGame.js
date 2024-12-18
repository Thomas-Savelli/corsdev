import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const SequenceGame = ({ onReturn }) => {
  const [gameState, setGameState] = useState('idle');
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [displaySequence, setDisplaySequence] = useState(false);

  // Générer une nouvelle séquence
  const generateSequence = () => {
    const newSequence = Array(4).fill()
      .map(() => Math.floor(Math.random() * 4));
    setSequence(newSequence);
    return newSequence;
  };

  // Démarrer le jeu
  const startGame = async () => {
    setGameState('playing');
    const newSequence = generateSequence();
    setPlayerSequence([]);
    
    // Afficher la séquence immédiatement
    setDisplaySequence(true);
    
    // Attendre 3 secondes avant de cacher la séquence
    setTimeout(() => {
      setDisplaySequence(false);
    }, 3000);
  };

  // Gérer les clics sur les boutons
  const handleButtonClick = (index) => {
    if (gameState !== 'playing' || displaySequence) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    // Vérifier si la séquence est correcte
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameState('failed');
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setGameState('success');
    }
  };

  return (
    <div className="bg-deadsec-dark border border-deadsec-blue/30 p-6 rounded-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-mono text-deadsec-blue">Sequence Memory</h3>
        <button
          onClick={onReturn}
          className="px-4 py-2 text-deadsec-blue hover:text-deadsec-purple transition-colors font-mono"
        >
          Retour
        </button>
      </div>

      <div className="space-y-6">
        {gameState === 'idle' && (
          <>
            <div className="text-gray-400 space-y-2">
              <p>Mémorisez la séquence et reproduisez-la !</p>
              <p>• La séquence s'affichera pendant 3 secondes</p>
              <p>• Reproduisez la séquence en cliquant sur les boutons</p>
            </div>
            <button
              onClick={startGame}
              className="w-full py-3 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors"
            >
              Commencer
            </button>
          </>
        )}

        {(gameState === 'playing' || gameState === 'success' || gameState === 'failed') && (
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                disabled={displaySequence || gameState !== 'playing'}
                className={`
                  h-24 border transition-all duration-300
                  ${displaySequence && sequence[playerSequence.length] === index
                    ? 'bg-deadsec-purple border-deadsec-purple'
                    : 'border-deadsec-blue hover:bg-deadsec-blue/10'
                  }
                `}
              />
            ))}
          </div>
        )}

        {gameState === 'success' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-blue text-xl">Séquence correcte !</div>
            <button
              onClick={startGame}
              className="px-4 py-2 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors"
            >
              Nouvelle séquence
            </button>
          </div>
        )}

        {gameState === 'failed' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-purple text-xl">Séquence incorrecte</div>
            <button
              onClick={startGame}
              className="px-4 py-2 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceGame; 