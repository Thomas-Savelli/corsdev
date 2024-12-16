import React, { useState, useEffect } from 'react';
import { Lock, Unlock, RefreshCw, Delete } from 'lucide-react';

const HackingGame = ({ onReturn }) => {
  const [gameState, setGameState] = useState('idle');
  const [attempts, setAttempts] = useState(8);
  const [code, setCode] = useState('');
  const [guess, setGuess] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [history, setHistory] = useState([]); // Pour garder trace des tentatives précédentes

  const generateCode = () => {
    const newCode = Array(4).fill()
      .map(() => Math.floor(Math.random() * 10).toString())
      .join('');
    setCode(newCode);
  };

  const startGame = () => {
    setGameState('playing');
    setAttempts(8);
    setGuess([]);
    setTimeLeft(120);
    setFeedback('');
    setHistory([]);
    generateCode();
  };

  const handleNumberClick = (number) => {
    if (guess.length < 4) {
      setGuess(prev => [...prev, number]);
    }
  };

  const handleDelete = () => {
    setGuess(prev => prev.slice(0, -1));
  };

  const handleValidate = () => {
    if (guess.length !== 4) return;
    
    const guessStr = guess.join('');
    
    // Vérifier les chiffres corrects et leur position
    const correctPositions = guess.filter((g, i) => g.toString() === code[i]).length;
    
    // Vérifier les chiffres présents mais mal placés
    const codeArray = code.split('');
    const wrongPositions = guess.filter((g, i) => {
      if (g.toString() === code[i]) return false; // Déjà compté comme correct
      return codeArray.includes(g.toString());
    }).length;
    
    // Ajouter la tentative à l'historique avec plus d'informations
    setHistory(prev => [...prev, {
      guess: guessStr,
      correct: correctPositions,
      present: wrongPositions
    }]);

    if (guessStr === code) {
      setGameState('success');
    } else {
      setFeedback(`${correctPositions} bien placé(s), ${wrongPositions} mal placé(s)`);
      setAttempts(prev => prev - 1);
      if (attempts <= 1) {
        setGameState('failed');
      }
      setGuess([]);
    }
  };

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

  const renderNumberPad = () => {
    return (
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
        {[...Array(9)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handleNumberClick(i + 1)}
            className="w-12 h-12 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors text-xl font-mono"
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handleNumberClick(0)}
          className="w-12 h-12 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors text-xl font-mono col-start-2"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="w-12 h-12 border border-deadsec-purple text-deadsec-purple hover:bg-deadsec-purple/10 transition-colors"
        >
          <Delete className="w-6 h-6 mx-auto" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-deadsec-dark border border-deadsec-blue/30 p-6 rounded-sm relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-mono text-deadsec-blue">Hack The Code</h3>
        <button
          onClick={onReturn}
          className="px-4 py-2 text-deadsec-blue hover:text-deadsec-purple transition-colors font-mono border border-deadsec-blue hover:border-deadsec-purple"
        >
          Retour
        </button>
      </div>

      <div className="space-y-6">
        {gameState === 'idle' && (
          <>
            <div className="text-gray-400 space-y-2">
              <p>Trouvez le code à 4 chiffres !</p>
              <p>• Vous avez 8 tentatives</p>
              <p>• Après chaque essai, vous saurez combien de chiffres sont bien placés</p>
              <p>• Le code est composé de chiffres entre 0 et 9</p>
            </div>
            <button
              onClick={startGame}
              className="w-full py-3 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors"
            >
              Commencer le Hack
            </button>
          </>
        )}

        {gameState === 'playing' && (
          <>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-deadsec-purple">Tentatives: {attempts}</span>
              <span className="text-deadsec-blue">Temps: {timeLeft}s</span>
            </div>

            {/* Historique des tentatives */}
            <div className="space-y-2 mb-4">
              {history.map((attempt, i) => (
                <div key={i} className="text-sm text-gray-400 flex justify-between">
                  <span>Tentative {i + 1}: {attempt.guess}</span>
                  <span>
                    <span className="text-deadsec-blue">{attempt.correct} bien placé(s)</span>
                    {attempt.present > 0 && (
                      <span className="text-deadsec-purple ml-2">{attempt.present} mal placé(s)</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Affichage de la tentative actuelle */}
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    w-12 h-12 border ${guess[i] ? 'border-deadsec-blue' : 'border-deadsec-blue/30'}
                    flex items-center justify-center text-2xl font-mono
                    text-deadsec-blue
                  `}
                >
                  {guess[i] || ''}
                </div>
              ))}
            </div>

            {renderNumberPad()}

            <button
              onClick={handleValidate}
              disabled={guess.length !== 4}
              className={`
                w-full py-2 border border-deadsec-blue text-deadsec-blue
                transition-all duration-300
                ${guess.length === 4 
                  ? 'hover:bg-deadsec-blue/10 hover:text-deadsec-purple' 
                  : 'opacity-50 cursor-not-allowed'}
              `}
            >
              Valider
            </button>
          </>
        )}

        {gameState === 'success' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-blue text-xl">Système Hacké !</div>
            <button
              onClick={startGame}
              className="px-4 py-2 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/10 transition-colors"
            >
              Rejouer
            </button>
          </div>
        )}

        {gameState === 'failed' && (
          <div className="text-center space-y-4">
            <div className="text-deadsec-purple text-xl">Échec du Hack</div>
            <div className="text-gray-400">Le code était: {code}</div>
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

export default HackingGame; 