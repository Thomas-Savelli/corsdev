import React, { useState } from 'react';
import { Send, Lock, Unlock, Shield, Terminal } from 'lucide-react';

const HackedContactForm = () => {
  const [formState, setFormState] = useState('idle'); // idle, scanning, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const simulateHacking = async () => {
    setFormState('scanning');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormState('sending');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    simulateHacking();
    // Ajoutez ici la vraie logique d'envoi
  };

  return (
    <div className="bg-deadsec-dark border border-deadsec-blue/30 p-6 rounded-sm relative overflow-hidden">
      {/* Effet de scan */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deadsec-blue/5 to-transparent opacity-50 animate-scan"></div>

      {/* En-tête */}
      <div className="mb-8 relative">
        <div className="flex items-center space-x-2 mb-2">
          <Terminal className="text-deadsec-purple w-5 h-5" />
          <h3 className="text-xl font-mono text-deadsec-blue">
            Établir une connexion
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400 font-mono">
          <span className="text-deadsec-purple">&gt;</span>
          <span className="typing-animation">
            {formState === 'idle' && 'En attente de connexion...'}
            {formState === 'scanning' && 'Scan des ports...'}
            {formState === 'sending' && 'Transmission des données...'}
            {formState === 'success' && 'Connexion établie !'}
            {formState === 'error' && 'Erreur de connexion...'}
          </span>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-mono text-deadsec-blue">
            <span className="text-deadsec-purple">&gt;</span> Identifiant
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-deadsec-gray/10 border border-deadsec-blue/30 p-3 text-white font-mono focus:border-deadsec-purple focus:outline-none transition-colors"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-mono text-deadsec-blue">
            <span className="text-deadsec-purple">&gt;</span> Adresse_IP
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-deadsec-gray/10 border border-deadsec-blue/30 p-3 text-white font-mono focus:border-deadsec-purple focus:outline-none transition-colors"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-mono text-deadsec-blue">
            <span className="text-deadsec-purple">&gt;</span> Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full h-32 bg-deadsec-gray/10 border border-deadsec-blue/30 p-3 text-white font-mono focus:border-deadsec-purple focus:outline-none transition-colors resize-none"
            placeholder="Entrez votre message..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={formState !== 'idle'}
          className={`
            w-full py-4 px-6 font-mono relative overflow-hidden
            ${formState === 'idle'
              ? 'bg-deadsec-blue/10 border border-deadsec-blue hover:bg-deadsec-purple/10 hover:border-deadsec-purple'
              : 'bg-deadsec-purple/10 border border-deadsec-purple'
            }
            transition-all duration-300 group
          `}
        >
          <div className="flex items-center justify-center space-x-2">
            {formState === 'idle' && (
              <>
                <Send className="w-5 h-5" />
                <span>Initialiser la connexion</span>
              </>
            )}
            {formState === 'scanning' && (
              <>
                <Lock className="w-5 h-5 animate-pulse" />
                <span>Scan en cours...</span>
              </>
            )}
            {formState === 'sending' && (
              <>
                <Unlock className="w-5 h-5 animate-pulse" />
                <span>Transmission...</span>
              </>
            )}
            {formState === 'success' && (
              <>
                <Shield className="w-5 h-5 text-deadsec-green" />
                <span className="text-deadsec-green">Message sécurisé envoyé</span>
              </>
            )}
          </div>

          {/* Effet de progression */}
          {(formState === 'scanning' || formState === 'sending') && (
            <div className="absolute bottom-0 left-0 h-1 bg-deadsec-purple/50">
              <div className="h-full bg-deadsec-purple animate-progress"></div>
            </div>
          )}
        </button>
      </form>

      {/* Effets de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-deadsec-blue/5 to-deadsec-purple/5"></div>
        <div className="absolute inset-0 bg-grid-deadsec opacity-10"></div>
      </div>
    </div>
  );
};

export default HackedContactForm; 