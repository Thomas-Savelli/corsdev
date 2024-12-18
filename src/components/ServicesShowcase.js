import React, { useState } from 'react';
import { Globe, Server, Code, Terminal, Settings, Cloud, Shield, Workflow } from 'lucide-react';

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      title: "Applications Web",
      icon: Globe,
      description: "Développement d'applications web sur mesure",
      details: [
        "Applications web complexes et évolutives",
        "Interfaces utilisateur modernes et réactives",
        "Progressive Web Apps (PWA)",
        "Intégration de systèmes tiers"
      ],
      technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      color: "deadsec-blue"
    },
    {
      title: "APIs & Backend",
      icon: Server,
      description: "Conception et développement d'APIs RESTful",
      details: [
        "APIs REST performantes",
        "Architectures backend robustes",
        "Bases de données optimisées",
        "Documentation OpenAPI"
      ],
      technologies: ["Django", "Python", "PostgreSQL", "FastAPI"],
      color: "deadsec-purple"
    },
    {
      title: "Solutions SaaS",
      icon: Cloud,
      description: "Développement de logiciels en tant que service",
      details: [
        "Applications cloud-native",
        "Architectures scalables",
        "Systèmes de facturation",
        "Tableaux de bord analytiques"
      ],
      technologies: ["Render", "PythonAnyWhere", "OVH", "Docker", "Node.js", "Stripe"],
      color: "deadsec-green"
    },
    {
      title: "Automatisation",
      icon: Settings,
      description: "Scripts et outils d'automatisation",
      details: [
        "Scripts d'automatisation",
        "Intégration continue (CI/CD)",
        "Tests automatisés",
        "Déploiement automatisé"
      ],
      technologies: ["Python", "Bash", "GitHub Actions"],
      color: "deadsec-blue"
    },
    {
      title: "Applications Métier",
      icon: Terminal,
      description: "Développement de logiciels métier spécifiques",
      details: [
        "Applications de gestion",
        "Outils métier sur mesure",
        "Intégration ERP/CRM",
        "Migration de systèmes legacy"
      ],
      technologies: ["React", "Django", "SQL", "REST"],
      color: "deadsec-purple"
    },
    {
      title: "DevOps",
      icon: Workflow,
      description: "Infrastructure et déploiement",
      details: [
        "Configuration de serveurs",
        "Conteneurisation",
        "Monitoring",
        "Gestion des logs"
      ],
      technologies: ["Docker", "Linux", "Nginx", "Git"],
      color: "deadsec-green"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index}
              className={`
                bg-deadsec-dark border border-${service.color}/30 p-6 rounded-sm 
                relative group cursor-pointer overflow-hidden
                hover:border-${service.color} transition-all duration-300
              `}
              onClick={() => setActiveService(activeService === index ? null : index)}
            >
              {/* Effet de scan */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deadsec-blue/5 to-transparent opacity-0 group-hover:opacity-50 animate-scan"></div>
              
              {/* Icon et Titre */}
              <div className="flex items-center space-x-3 mb-4">
                <Icon className={`w-6 h-6 text-${service.color}`} />
                <h3 className={`text-xl font-mono text-${service.color}`}>
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-400 mb-4">
                {service.description}
              </p>

              {/* Détails */}
              {activeService === index && (
                <div className="space-y-4 mt-6 border-t border-deadsec-blue/20 pt-4">
                  <ul className="space-y-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-center space-x-2">
                        <span className="text-deadsec-purple">›</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className={`text-xs px-2 py-1 bg-${service.color}/10 text-${service.color} rounded-sm`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Indicateur d'expansion */}
              <div className={`
                absolute bottom-2 right-2 
                transform transition-transform duration-300
                ${activeService === index ? 'rotate-180' : ''}
              `}>
                <Code className={`w-4 h-4 text-${service.color}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesShowcase; 