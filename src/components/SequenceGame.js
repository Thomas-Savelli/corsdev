import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const SequenceGame = ({ onReturn }) => {
  const [gameState, setGameState] = useState('idle');
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showingCommand, setShowingCommand] = useState(false);

  const commands = [
    'npm install',
    'git push origin',
    'docker build .',
    'python manage.py',
    'ssh root@server',
    'sudo systemctl',
    'nginx restart',
    'yarn dev',
    'git checkout -b',
    'docker-compose up'
  ];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setCurrentStep(0);
    generateNewSequence();
  };

  const generateNewSequence = () => {
    const sequenceLength = Math.min(level + 2, 6); // Maximum 6 commandes
    const newSequence = Array(sequenceLength).fill()
      .map(() => commands[Math.floor(Math.random() * commands.length)]);
    setSequence(newSequence);
    showNextCommand(0);
  };

  const showNextCommand = (index) => {
    if (index >= sequence.length) {
      setShowingCommand(false);
      return;
    }
    
    setShowingCommand(true);
    setPlayerInput('');
    
    // Montrer la commande pendant 2 secondes
    setTimeout(() => {
      setShowingCommand(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    if (gameState !== 'playing' || showingCommand) return;
    setPlayerInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameState !== 'playing' || showingCommand) return;

    if (playerInput === sequence[currentStep]) {
      // Commande correcte
      if (currentStep === sequence.length - 1) {
        // Séquence complète
        setScore(score + (level * 100));
        setLevel(level + 1);
        setCurrentStep(0);
        setTimeout(generateNewSequence, 1000);
      } else {
        // Passer à la commande suivante
        setCurrentStep(currentStep + 1);
        showNextCommand(currentStep + 1);
      }
    } else {
      // Erreur = Game Over
      setGameState('failed');
    }
    setPlayerInput('');
  };

  return (
    <div className="bg-deadsec-dark border border-deadsec-blue/30 p-6 rounded-sm relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-mono text-deadsec-blue">Terminal Sequence</h3>
        <button onClick={onReturn} className="px-4 py-2 text-deadsec-blue hover:text-deadsec-purple transition-colors font-mono border border-deadsec-blue hover:border-deadsec-purple">
          Retour
        </button>
      </div>

      <div className="space-y-6">
        {gameState === 'idle' && (
          <>
            <div className="text-gray-400 space-y-2">
              <p>Mémorisez et reproduisez les commandes terminal !</p>
              <p>• Les commandes s'afficheront une par une</p>
              <p>• Reproduisez-les exactement dans le même ordre</p>
              <p>• La séquence s'allongera à chaque niveau</p>
            </div>
            <button
              onClick={startGame}
              className="w-full py-3 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors"
            >
              Initialiser Terminal
            </button>
          </>
        )}

        {gameState === 'playing' && (
          <>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-deadsec-purple">Niveau: {level}</span>
              <span className="text-deadsec-blue">Score: {score}</span>
            </div>

            <div className="bg-black/50 p-4 font-mono rounded-sm mb-4 min-h-[200px]">
              {/* Historique des commandes validées */}
              {sequence.slice(0, currentStep).map((cmd, i) => (
                <div key={i} className="text-green-500">$ {cmd}</div>
              ))}
              
              {/* Commande en cours d'affichage */}
              {showingCommand && (
                <div className="text-deadsec-blue animate-pulse">
                  $ {sequence[currentStep]}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-deadsec-purple">$</span>
              <input
                type="text"
                value={playerInput}
                onChange={handleInputChange}
                disabled={showingCommand}
                className="w-full bg-black/30 border border-deadsec-blue/50 px-8 py-2 text-deadsec-blue font-mono focus:outline-none focus:border-deadsec-purple"
                placeholder={showingCommand ? 'Mémorisez la commande...' : 'Entrez la commande...'}
              />
            </form>
          </>
        )}

        {gameState === 'failed' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-purple text-xl">Commande Incorrecte !</div>
            <div className="text-gray-400">Score final: {score}</div>
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