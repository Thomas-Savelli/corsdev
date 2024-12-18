import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import useMatrixMode from '../hooks/useMatrixMode';
import useSoundSystem from '../hooks/useSoundSystem';
import useNotifications from '../hooks/useNotifications';

const TerminalComponent = ({ isFloating = false }) => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isOpen, setIsOpen] = useState(!isFloating);
  const { startMatrixMode, stopMatrixMode, isMatrixMode } = useMatrixMode();
  const { playSound } = useSoundSystem();

  const commands = {
    help: `
      Commandes disponibles :
      ├── help          : Affiche cette aide
      ├── skills        : Liste mes compétences
      ├── about         : À propos de moi
      ├── services      : Liste mes services
      ├── contact       : Mes informations de contact
      ├── timeline      : Mon parcours professionnel
      ├── clear         : Efface le terminal
      └── matrix        : Mode Matrix
    `,
    skills: `
      > Compétences principales :
      ├── Frontend
      │   ├── HTML5 / CSS3 / Java Script
      │   ├── SASS
      │   ├── React.js / Next.js
      │   ├── TailwindCSS
      │   └── Context API
      │
      ├── Backend
      │   ├── Python / Django
      │   ├── API REST
      │   └── PostgreSQL / MySQL / NoSQL
      │
      └── DevOps
          ├── Docker / Linux
          ├── Git / GitHub Actions
          ├── Nginx / Apache
          └── Render / OVH
    `,
    services: `
      > Services proposés :
      ├── Applications Web
      │   └── Applications web complexes et évolutives
      │
      ├── APIs & Backend
      │   └── Conception et développement d'APIs RESTful
      │
      ├── Solutions SaaS
      │   └── Développement de logiciels en tant que service
      │
      ├── Automatisation
      │   └── Scripts et outils d'automatisation
      │
      ├── Applications Métier
      │   └── Développement de logiciels métier spécifiques
      │
      └── DevOps
          └── Infrastructure et déploiement
    `,
    about: `
      > whoami
      ├── Nom: Thomas Savelli
      ├── Rôle: Développeur Full Stack
      ├── Spécialités: 
      │   ├── Applications Web
      │   ├── APIs RESTful
      │   └── Solutions SaaS
      └── Mission: Créer des applications performantes et évolutives
    `,
    timeline: `
      > Timeline :
      ├── 2023 - Présent
      │   └── Projets Freelance
      │       └── Réalisation de projets web ou local pour divers clients.
      ├── 2023 - 2024
      │   └── Dîplome de Niveau 6 (Bac +4)
      │       └── Développeur d'applications Python
      │
      └── 2022 - 2023
          └── Reconversion professionnelle
              └── Après dix ans dans le domaine de l'aéroportuaire, j'ai décidé de me reconvertir dans ma passion, l'informatique !
    `,
    contact: `
      > Contact :
      ├── Email: thomas.savelli@corsdev.com
      ├── GitHub: https://github.com/Thomas-Savelli
      └── LinkedIn: https://www.linkedin.com/in/thomas-savelli
    `,
    matrix: () => {
      if (isMatrixMode) {
        playSound('glitch');
        stopMatrixMode();
        return { output: 'Mode Matrix désactivé.' };
      } else {
        playSound('hack');
        startMatrixMode();
        return { output: 'Mode Matrix activé. Tapez "matrix" à nouveau ou appuyez sur Echap pour désactiver.' };
      }
    },
    clear: 'CLEAR',
    ls: 'Fichiers disponibles : about.txt, skills.md, services.json, contact.info',
    cat: 'Utilisation : cat <nom_fichier>'
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = currentCommand.toLowerCase().trim();
      
      // Gérer la commande matrix
      if (cmd === 'matrix') {
        const response = commands.matrix();
        setCommandHistory(prev => [...prev, 
          { type: 'input', text: currentCommand },
          { type: 'output', text: response.output }
        ]);
      }
      // Gérer les autres commandes
      else if (cmd === 'clear') {
        setCommandHistory([]);
      } else {
        let response = commands[cmd] || `Commande '${cmd}' non reconnue. Tapez 'help' pour la liste des commandes.`;
        
        // Commandes spéciales
        if (cmd.startsWith('cat ')) {
          const file = cmd.split(' ')[1];
          response = `Lecture de ${file}...\n${commands[file.split('.')[0]] || 'Fichier non trouvé.'}`;
        }

        setCommandHistory(prev => [...prev, 
          { type: 'input', text: currentCommand },
          { type: 'output', text: response }
        ]);
      }
      
      setCurrentCommand('');
      setTimeout(() => {
        const terminal = document.querySelector('.terminal-content');
        terminal.scrollTop = terminal.scrollHeight;
      }, 100);
    }
  };

  useEffect(() => {
    setCommandHistory([
      { type: 'output', text: 'DedSec Terminal v1.0' },
      { type: 'output', text: "Tapez 'help' pour voir les commandes disponibles." }
    ]);
  }, []);

  // Fonction pour ouvrir le terminal depuis l'extérieur
  useEffect(() => {
    window.openTerminal = () => setIsOpen(true);
  }, []);

  return (
    <>
      {/* Bouton flottant pour ouvrir le terminal */}
      {isFloating && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-deadsec-dark border border-deadsec-blue p-3 rounded-sm hover:border-deadsec-purple transition-all z-[60] group terminal-toggle"
        >
          <Terminal className="w-5 h-5 text-deadsec-blue group-hover:text-deadsec-purple" />
        </button>
      )}

      {/* Overlay sombre */}
      {isFloating && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Terminal */}
      {(!isFloating || isOpen) && (
        <div 
          style={{ maxHeight: 'calc(100vh - 40px)' }}
          className={`
            bg-deadsec-dark border border-deadsec-blue/30 rounded-sm p-4 font-mono text-sm
            ${isFloating ? `
              fixed 
              left-1/2 top-1/2 
              -translate-x-1/2 -translate-y-1/2
              w-[90vw] max-w-[800px]
              h-[90vh] max-h-[800px]
              z-[70] shadow-lg
            ` : 'w-full relative'}
          `}
        >
          {/* Header du terminal */}
          <div className="flex items-center justify-between mb-2 border-b border-deadsec-blue/20 pb-2 sticky top-0 bg-deadsec-dark z-10">
            <div className="flex space-x-2">
              {isFloating && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                />
              )}
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
            </div>
            <span className="text-deadsec-blue text-xs group-hover:text-deadsec-purple transition-colors">
              DedSec_Terminal v2.0
            </span>
          </div>
          
          {/* Contenu du terminal */}
          <div className="terminal-content h-[calc(100%-3rem)] overflow-y-auto space-y-2">
            {commandHistory.map((cmd, i) => (
              <div 
                key={i} 
                className={`${cmd.type === 'input' ? 'text-deadsec-purple' : 'text-deadsec-blue'} group`}
              >
                {cmd.type === 'input' ? '> ' : ''}
                <span className={`${cmd.type === 'output' ? 'whitespace-pre-wrap' : ''} group-hover:text-deadsec-purple transition-colors`}>
                  {cmd.text}
                </span>
              </div>
            ))}
            
            {/* showPrompt && ( */}
            <div className="flex items-center text-deadsec-purple sticky bottom-0 bg-deadsec-dark">
              <span className="animate-pulse">{'> '}</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent outline-none flex-1 ml-1 focus:text-deadsec-blue transition-colors"
                autoFocus
              />
            </div>
            {/* ) */}
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalComponent; 