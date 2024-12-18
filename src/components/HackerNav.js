import React, { useState, useEffect } from 'react';
import { Terminal, Code, Network, Mail, Monitor, Server, Database } from 'lucide-react';

const HackerNav = ({ className }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => {
    return window.innerWidth <= 1024 || window.innerHeight <= 768;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { 
      id: 'terminal', 
      icon: Terminal, 
      label: 'sys.terminal' 
    },
    { 
      id: 'competences', 
      icon: Code, 
      label: 'sys.skills' 
    },
    { 
      id: 'services', 
      icon: Server, 
      label: 'sys.services' 
    },
    { 
      id: 'parcours', 
      icon: Network, 
      label: 'sys.timeline' 
    },
    { 
      id: 'game', 
      icon: Monitor, 
      label: 'exe.games' 
    },
    { 
      id: 'contact', 
      icon: Mail, 
      label: 'init.connect' 
    }
  ];

  // Effet de scan pour détecter la section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Détecter si on est sur mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024 || window.innerHeight <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsHacking(true);
    
    if (sectionId === 'terminal') {
      window.openTerminal?.();
      setIsHacking(false);
      return;
    }

    // Effet de "compilation" avant le scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      section.scrollIntoView({ behavior: 'smooth' });
      setIsHacking(false);
    }, 500);
  };

  // Version mobile
  if (isMobileOrTablet) {
    return (
      <>
        {/* Menu Burger en haut */}
        <nav className={`fixed top-0 left-0 w-full bg-deadsec-dark/95 backdrop-blur-sm z-[100] border-b border-deadsec-blue/20 ${className}`}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="text-deadsec-blue font-mono text-lg">
                <span className="text-deadsec-purple/50">&gt; </span>
                <span>{isHacking ? 'COMPILING...' : 'CORSDEV.exe'}</span>
              </div>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-8 h-8 focus:outline-none"
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <span className={`w-6 h-0.5 bg-deadsec-blue transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                  <span className={`w-6 h-0.5 bg-deadsec-blue my-0.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`w-6 h-0.5 bg-deadsec-blue transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`} />
                </div>
              </button>
            </div>

            {/* Menu déroulant vertical */}
            <div className={`
              transform transition-all duration-300 ease-in-out overflow-hidden
              ${isMenuOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'}
              bg-deadsec-dark/95 backdrop-blur-sm
            `}>
              <div className="py-2">
                <div className="flex flex-col space-y-1">
                  {navItems.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => {
                        handleNavClick(id);
                        setIsMenuOpen(false);
                      }}
                      className={`
                        flex items-center space-x-3 px-4 py-3
                        ${activeSection === id ? 'text-deadsec-purple bg-deadsec-blue/5' : 'text-deadsec-blue'}
                        hover:bg-deadsec-blue/10 transition-colors border-l-2
                        ${activeSection === id ? 'border-l-deadsec-purple' : 'border-l-transparent'}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-mono text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Barre de navigation rapide en bas */}
        <div className="fixed bottom-0 left-0 w-full z-[100]">
          <div className="bg-deadsec-dark/95 backdrop-blur-sm border-t border-deadsec-blue/30">
            <div className="container mx-auto px-4 py-3">
              <div className="flex justify-around items-center">
                {navItems.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={`
                      p-3 relative group
                      ${activeSection === id ? 'text-deadsec-purple' : 'text-deadsec-blue'}
                      hover:text-deadsec-purple transition-colors
                    `}
                  >
                    <Icon className="w-6 h-6" />
                    
                    {/* Indicateur actif */}
                    {activeSection === id && (
                      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-deadsec-purple rounded-full"></div>
                    )}

                    {/* Label au tap/hover */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono 
                      opacity-0 group-hover:opacity-100 transition-opacity bg-deadsec-dark/90 
                      px-2 py-1 rounded whitespace-nowrap border border-deadsec-blue/30">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Version desktop
  return (
    <nav className={`fixed top-0 left-0 w-full bg-deadsec-dark/95 backdrop-blur-sm z-[100] border-b border-deadsec-blue/20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-deadsec-blue font-mono text-xl group cursor-pointer">
            <span className="text-deadsec-purple/50">&gt; </span>
            <span className="group-hover:text-deadsec-purple transition-colors">
              {isHacking ? 'COMPILING...' : 'CORSDEV.exe'}
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex space-x-8">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`
                  flex items-center space-x-2 font-mono 
                  transition-all duration-300 relative
                  ${activeSection === id ? 'text-deadsec-purple' : 'text-deadsec-blue'}
                  hover:text-deadsec-purple group
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                
                {/* Indicateur actif */}
                {activeSection === id && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-deadsec-purple/50">
                    <div className="absolute top-0 left-0 h-full bg-deadsec-purple animate-glitch-small"></div>
                  </div>
                )}

                {/* Effet de scan au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-deadsec-blue/5 to-transparent opacity-0 group-hover:opacity-100 animate-scan"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Effet de hacking global */}
      {isHacking && (
        <div className="absolute inset-0 bg-gradient-to-r from-deadsec-blue/10 via-deadsec-purple/10 to-deadsec-blue/10 animate-glitch"></div>
      )}
    </nav>
  );
};

export default HackerNav; 