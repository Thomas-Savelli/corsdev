import React, { useState } from 'react';
import { Shield, Code, Database, Lock, Terminal, Cpu } from 'lucide-react';

const TechnicalShowcase = () => {
  const [activeDemo, setActiveDemo] = useState(null);

  const showcases = [
    {
      title: "Sécurité Web",
      icon: Shield,
      description: "Mini CTF avec différents challenges de sécurité",
      challenges: [
        {
          name: "XSS Challenge",
          description: "Trouvez et exploitez une vulnérabilité XSS",
          difficulty: "Moyen",
          points: 100
        },
        {
          name: "SQL Injection",
          description: "Exploitez une faille SQL pour accéder aux données",
          difficulty: "Difficile",
          points: 200
        }
      ],
      color: "deadsec-purple"
    },
    {
      title: "Cryptographie",
      icon: Lock,
      description: "Challenges de décryptage et encodage",
      challenges: [
        {
          name: "Decode Matrix",
          description: "Décryptez le message encodé en utilisant la clé fournie",
          difficulty: "Facile",
          points: 50
        },
        {
          name: "Hash Cracking",
          description: "Retrouvez le message original à partir du hash",
          difficulty: "Moyen",
          points: 150
        }
      ],
      color: "deadsec-blue"
    },
    {
      title: "Optimisation",
      icon: Cpu,
      description: "Défis d'optimisation de code et de performance",
      challenges: [
        {
          name: "Cache Challenge",
          description: "Optimisez la fonction pour utiliser le caching",
          difficulty: "Moyen",
          points: 100
        },
        {
          name: "Algorithme Challenge",
          description: "Trouvez une solution plus efficace à ce problème",
          difficulty: "Difficile",
          points: 200
        }
      ],
      color: "deadsec-green"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Grille des showcases */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcases.map((showcase, index) => {
          const Icon = showcase.icon;
          return (
            <div 
              key={index}
              className={`
                bg-deadsec-dark border border-${showcase.color}/30 p-6 rounded-sm 
                relative group cursor-pointer overflow-hidden
                hover:border-${showcase.color} transition-all duration-300
              `}
              onClick={() => setActiveDemo(activeDemo === index ? null : index)}
            >
              {/* Effet de scan */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deadsec-blue/5 to-transparent opacity-0 group-hover:opacity-50 animate-scan"></div>
              
              {/* Icon et Titre */}
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`w-6 h-6 text-${showcase.color}`} />
                <h3 className={`text-xl font-mono text-${showcase.color}`}>
                  {showcase.title}
                </h3>
              </div>

              <p className="text-gray-400 mb-4">
                {showcase.description}
              </p>

              {/* Challenges */}
              {activeDemo === index && (
                <div className="space-y-4 mt-6 border-t border-deadsec-blue/20 pt-4">
                  {showcase.challenges.map((challenge, i) => (
                    <div 
                      key={i}
                      className="bg-deadsec-gray/10 p-4 rounded-sm border border-deadsec-blue/10 hover:border-deadsec-purple/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-deadsec-blue font-mono">
                          {challenge.name}
                        </h4>
                        <span className={`text-${showcase.color} text-sm`}>
                          {challenge.points} pts
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-deadsec-purple">
                          {challenge.difficulty}
                        </span>
                        <button 
                          className={`
                            px-4 py-1 text-sm border border-${showcase.color}/50 
                            hover:bg-${showcase.color}/10 transition-all
                            text-${showcase.color}
                          `}
                        >
                          Commencer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Indicateur d'expansion */}
              <div className={`
                absolute bottom-2 right-2 
                transform transition-transform duration-300
                ${activeDemo === index ? 'rotate-180' : ''}
              `}>
                <Code className={`w-4 h-4 text-${showcase.color}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechnicalShowcase; 