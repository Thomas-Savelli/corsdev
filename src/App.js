import React, { useState, useEffect } from 'react';
import photoThomas from './assets/images/photo.jpeg';
import { Terminal as TerminalIcon, Github, Mail, Code, Monitor, Database } from 'lucide-react';
import TerminalComponent from './components/Terminal';
import SkillCard from './components/SkillCard';
import Timeline from './components/Timeline';
import HackingGame from './components/HackingGame';
import GameSelector from './components/GameSelector';
import MemoryGame from './components/MemoryGame';
import HackedContactForm from './components/HackedContactForm';
import DynamicFooter from './components/DynamicFooter';
import SectionTransition from './components/SectionTransition';
import useEasterEggs from './hooks/useEasterEggs';
import useNotifications from './hooks/useNotifications';
import DedsecNotification from './components/DedsecNotification';
import ThreeDBackground from './components/ThreeDBackground';
import useSoundSystem from './hooks/useSoundSystem';
import useMatrixMode from './hooks/useMatrixMode';
import HackerNav from './components/HackerNav';
import ServicesShowcase from './components/ServicesShowcase';
import SequenceGame from './components/SequenceGame';

function App() {
  const [gameState, setGameState] = useState({
    selectedGame: null,
    isPlaying: false
  });
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { playSound } = useSoundSystem();
  const { isMatrixMode, startMatrixMode, stopMatrixMode } = useMatrixMode();
  useEasterEggs();

  const handleGameSelect = (gameId) => {
    console.log('App handling game selection:', gameId);
    setGameState({
      selectedGame: gameId,
      isPlaying: true
    });
  };

  const handleGameReturn = () => {
    console.log('Returning to game selection');
    setGameState({
      selectedGame: null,
      isPlaying: false
    });
  };

  const renderGameContent = () => {
    if (!gameState.isPlaying) {
      return <GameSelector onSelectGame={handleGameSelect} />;
    }

    switch (gameState.selectedGame) {
      case 'matrix':
        return <HackingGame onReturn={handleGameReturn} />;
      case 'memory':
        return <MemoryGame onReturn={handleGameReturn} />;
      case 'sequence':
        return <SequenceGame onReturn={handleGameReturn} />;
      default:
        return <GameSelector onSelectGame={handleGameSelect} />;
    }
  };

  const handleSuccessfulHack = () => {
    addNotification('Système piraté avec succès !');
  };

  const handleInteraction = (type) => {
    switch(type) {
      case 'hover':
        playSound('hover');
        break;
      case 'click':
        playSound('click');
        break;
      case 'success':
        playSound('success');
        break;
      // etc.
    }
  };

  useEffect(() => {
    const handleHover = () => playSound('hover');
    const handleClick = () => playSound('click');

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('click', handleClick);
    };
  }, [playSound]);

  return (
    <div className="min-h-screen bg-deadsec-dark relative overflow-hidden">
      <HackerNav />
      <ThreeDBackground />
      
      {/* Grille de fond animée - Ajout de pointer-events-none */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-deadsec-blue/20" />
          ))}
        </div>
      </div>

      {/* Terminal flottant avec z-index élevé */}
      <TerminalComponent isFloating={true} />

      <main>
        {/* Hero Section */}
        <SectionTransition>
          <section className="h-[80vh] flex items-center relative pb-0 mt-20">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-deadsec-dark via-deadsec-dark/95 to-transparent"></div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 w-full relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 font-mono">
                  <div className="inline-flex bg-deadsec-gray/50 px-4 py-2 rounded-sm border border-deadsec-blue/20">
                    <span className="text-deadsec-purple">&gt; </span>
                    <div className="typing-animation">
                      <span className="text-white">initialize_system()</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl">
                      <span className="text-deadsec-purple"># </span>
                      Je suis{' '}
                      <span className="text-deadsec-blue glitch-text" data-text="Thomas">
                        Thomas
                      </span>
                    </h1>
                    <p className="text-2xl text-gray-400">
                      <span className="text-deadsec-purple">&gt; </span>
                      <span className="text-deadsec-blue">Développeur Full Stack</span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="#contact"
                      className="px-6 py-3 bg-deadsec-blue/10 border border-deadsec-blue text-deadsec-blue hover:bg-deadsec-blue/20 hover:text-deadsec-purple transition-all flex items-center space-x-2"
                    >
                      <Mail className="animate-pulse" size={20} />
                      <span>CONNECT</span>
                    </a>
                    <a 
                      href="https://github.com/Thomas-Savelli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-deadsec-gray/50 hover:bg-deadsec-gray hover:text-deadsec-purple transition-all flex items-center space-x-2"
                    >
                      <Github size={20} />
                      <span>SOURCE</span>
                    </a>
                  </div>
                </div>

                {/* Partie image modifiée - Version unique et corrigée */}
                <div className="relative w-2/3 ml-auto">
                  <div className="relative overflow-hidden rounded-sm deadsec-container">
                    {/* Image de base */}
                    <img 
                      src={photoThomas}
                      alt="Thomas Savelli"
                      className="w-full aspect-[3/4] object-cover object-center grayscale contrast-125 relative z-10"
                    />
                    
                    {/* Calques d'effets glitch */}
                    <div className="glitch-deadsec">
                      <div className="glitch-copy" style={{backgroundImage: `url(${photoThomas})`}}></div>
                      <div className="glitch-copy" style={{backgroundImage: `url(${photoThomas})`}}></div>
                      <div className="glitch-copy" style={{backgroundImage: `url(${photoThomas})`}}></div>
                      <div className="glitch-copy" style={{backgroundImage: `url(${photoThomas})`}}></div>
                      <div className="glitch-copy" style={{backgroundImage: `url(${photoThomas})`}}></div>
                    </div>

                    {/* Overlay et effets */}
                    <div className="absolute inset-0 glitch-overlay"></div>
                    <div className="absolute -inset-0.5 bg-deadsec-blue/20 rounded-sm blur-sm animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-deadsec-blue/10 to-deadsec-purple/10 rounded-sm -rotate-2"></div>
                    <div className="absolute inset-0 deadsec-overlay mix-blend-screen"></div>
                    <div className="absolute inset-0 border border-deadsec-blue/50 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Section Compétences */}
        <SectionTransition>
          <section id="competences" className="py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-mono mb-12">
                <span className="text-deadsec-purple"># </span>
                <span className="text-deadsec-blue">Compétences</span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkillCard 
                  icon={Monitor}
                  title="Frontend"
                  skills={[
                    'HTML5 / CSS3 / Java Script',
                    'React.js / Next.js',
                    'Tailwind CSS',
                    'Context API'
                  ]}
                />

                <SkillCard 
                  icon={Database}
                  title="Backend"
                  skills={[
                    'Python / Django',
                    'PostgreSQL / MySQL / NoSQL',
                    'API REST / GraphQL',
                    'Docker / CI/CD'
                  ]}
                  color="deadsec-purple"
                />
                
                <SkillCard 
                  icon={Code}
                  title="Autres"
                  skills={[
                    'Git / GitHub',
                    'Tests unitaires',
                    'Nginx / Apache',
                    'Linux / Bash',
                    'Render / OVH',
                    'Méthodologie Agile'
                  ]}
                  color="deadsec-green"
                />
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Section Services */}
        <SectionTransition>
          <section id="services" className="py-20 bg-deadsec-gray/10">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-mono mb-12">
                <span className="text-deadsec-purple"># </span>
                <span className="text-deadsec-blue">Services & Expertises</span>
              </h2>

              <ServicesShowcase />
            </div>
          </section>
        </SectionTransition>

        {/* Section Timeline */}
        <SectionTransition>
          <section id="parcours" className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-mono mb-12">
                <span className="text-deadsec-purple"># </span>
                <span className="text-deadsec-blue">Parcours</span>
              </h2>

              <Timeline />
            </div>
          </section>
        </SectionTransition>

        {/* Section Mini-Jeux */}
        <SectionTransition>
          <section id="game" className="py-20 bg-deadsec-gray/10">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-mono">
                  <span className="text-deadsec-purple"># </span>
                  <span className="text-deadsec-blue">Debug The System</span>
                </h2>
              </div>
              
              <div className="relative">
                {renderGameContent()}
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Section Contact */}
        <SectionTransition>
          <section id="contact" className="py-20">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-mono mb-12">
                <span className="text-deadsec-purple"># </span>
                <span className="text-deadsec-blue">Établir le Contact</span>
              </h2>
              
              <HackedContactForm />
            </div>
          </section>
        </SectionTransition>

        {/* Continuez avec les autres sections... */}
      </main>

      {/* Footer */}
      <DynamicFooter />

      {/* Notifications avec z-index plus élevé que le terminal */}
      <div className="fixed bottom-4 right-4 space-y-2 z-[80]">
        {notifications.map(({ id, message }) => (
          <DedsecNotification
            key={id}
            message={message}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;