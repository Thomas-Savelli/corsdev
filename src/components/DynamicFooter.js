import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Terminal, Code, Shield, Cpu } from 'lucide-react';

const DynamicFooter = () => {
  const [stats, setStats] = useState({
    visitors: 0,
    uptime: '00:00:00',
    connections: 0
  });

  // Simuler des statistiques en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 2),
        uptime: new Date().toLocaleTimeString(),
        connections: prev.connections + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { icon: Github, url: 'https://github.com/votre-compte', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/votre-profil', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:votre@email.com', label: 'Email' }
  ];

  return (
    <footer className="bg-deadsec-dark border-t border-deadsec-blue/30 relative overflow-hidden">
      {/* Effet de scan */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deadsec-blue/5 to-transparent opacity-30 animate-scan"></div>

      {/* Grille de fond */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Section supérieure */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Stats en temps réel */}
          <div className="space-y-4">
            <h4 className="text-deadsec-blue font-mono text-lg mb-4 flex items-center">
              <Terminal className="w-5 h-5 mr-2" />
              Statistiques_Système
            </h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span>Visiteurs:</span>
                <span className="text-deadsec-purple">{stats.visitors}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Uptime:</span>
                <span className="text-deadsec-blue">{stats.uptime}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Connexions:</span>
                <span className="text-deadsec-green">{stats.connections}</span>
              </div>
            </div>
          </div>

          {/* Code qui défile */}
          <div className="relative h-32 overflow-hidden font-mono text-xs">
            <div className="absolute inset-0 bg-deadsec-dark/80"></div>
            <div className="animate-scroll">
              {Array(20).fill().map((_, i) => (
                <div key={i} className="text-deadsec-blue/50">
                  {`> ${Math.random().toString(36).substring(7)}`}
                </div>
              ))}
            </div>
          </div>

          {/* Liens sociaux */}
          <div className="flex flex-col items-end">
            <h4 className="text-deadsec-blue font-mono text-lg mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Connexions_Externes
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-deadsec-blue/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Icon className="w-6 h-6 text-deadsec-blue hover:text-deadsec-purple transition-colors relative z-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section inférieure */}
        <div className="border-t border-deadsec-blue/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 font-mono text-sm text-gray-400">
              <Shield className="w-4 h-4 text-deadsec-green" />
              <span>Système sécurisé par DedSec</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-deadsec-purple animate-pulse" />
              <span className="font-mono text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Thomas Savelli
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lignes de connexion animées */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-deadsec-blue/0 via-deadsec-blue/20 to-deadsec-blue/0 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-deadsec-purple/0 via-deadsec-purple/20 to-deadsec-purple/0 animate-pulse delay-100"></div>
      </div>
    </footer>
  );
};

export default DynamicFooter; 