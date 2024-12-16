import React, { useState, useEffect } from 'react';
import { Terminal, Code, Network, Mail, Monitor, Server } from 'lucide-react';

const HackerNav = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isHacking, setIsHacking] = useState(false);

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

  return (
    <nav className="fixed top-0 left-0 w-full bg-deadsec-dark/90 backdrop-blur-sm z-50 border-b border-deadsec-blue/20">
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