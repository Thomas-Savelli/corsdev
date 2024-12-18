import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const TimelineItem = ({ date, title, description, icon: Icon, isLeft }) => {
  return (
    <div className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center group`}>
      {/* Contenu */}
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <div className="space-y-2">
          <span className="text-deadsec-purple font-mono text-sm">{date}</span>
          <h3 className="text-deadsec-blue text-lg font-mono group-hover:text-deadsec-purple transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>

      {/* Point central avec icône */}
      <div className="w-2/12 flex justify-center relative">
        <div className="w-px h-full bg-deadsec-blue/30 absolute"></div>
        <div className="w-12 h-12 rounded-full bg-deadsec-dark border-2 border-deadsec-blue flex items-center justify-center relative z-10 group-hover:border-deadsec-purple transition-colors">
          <Icon className="w-6 h-6 text-deadsec-blue group-hover:text-deadsec-purple transition-colors" />
        </div>
      </div>

      {/* Espace pour l'autre côté */}
      <div className="w-5/12"></div>
    </div>
  );
};

const Timeline = () => {
  const events = [
    {
      date: "2023 - Présent",
      title: "Projets Freelance",
      description: "Réalisation de projets web ou local pour divers clients.",
      icon: Briefcase
    },
    {
      date: "2023 - 2024",
      title: "Dîplome de Niveau 6 (Bac +4)",
      description: "Développeur d'applications Python",
      icon: GraduationCap
    },
    {
      date: "2022 - 2023",
      title: "Reconversion professionnelle",
      description: "Après dix ans dans le domaine de l'aéroportuaire, j'ai décidé de me reconvertir dans ma passion, l'informatique !",
      icon: Award
    },
    // Ajoutez d'autres événements ici
  ];

  return (
    <div className="relative">
      {/* Lignes de connexion animées */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at center, ${getComputedStyle(document.documentElement).getPropertyValue('--deadsec-blue')} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Timeline items */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            {...event}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>

      {/* Effet de scan */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deadsec-blue/5 to-transparent opacity-50 animate-scan"></div>
    </div>
  );
};

export default Timeline; 