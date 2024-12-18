import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-deadsec-dark/90 backdrop-blur-sm">
      {/* Version Desktop */}
      <div className="hidden md:flex container mx-auto px-4 items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-6 h-6 text-deadsec-blue" />
          <span className="text-deadsec-blue font-mono">CorsDevTech</span>
        </div>
        <div className="flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-deadsec-blue hover:text-deadsec-purple transition-colors font-mono"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Version Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-deadsec-blue" />
            <span className="text-deadsec-blue font-mono">CorsDevTech</span>
          </div>
          
          {/* Burger Menu Animé */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 focus:outline-none"
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span 
                className={`
                  w-6 h-0.5 bg-deadsec-blue transition-all duration-300
                  ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}
                `}
              />
              <span 
                className={`
                  w-6 h-0.5 bg-deadsec-blue my-0.5 transition-opacity duration-300
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
                `}
              />
              <span 
                className={`
                  w-6 h-0.5 bg-deadsec-blue transition-all duration-300
                  ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}
                `}
              />
            </div>
          </button>
        </div>
        
        {/* Menu Mobile Dropdown avec animation */}
        <div 
          className={`
            transform transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
            bg-deadsec-dark/95 border-t border-deadsec-blue/20
          `}
        >
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="
                block py-3 px-4 text-deadsec-blue hover:text-deadsec-purple
                transition-colors font-mono border-b border-deadsec-blue/10
                hover:bg-deadsec-blue/5
              "
            >
              <span className="text-deadsec-purple">›</span> {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 