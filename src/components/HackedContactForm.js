import React, { useState, useRef } from 'react';
import { Send, Lock, Unlock, Shield, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_CONFIG } from '../config/recaptcha';
import { EMAIL_CONFIG } from '../config/email';

const HackedContactForm = () => {
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const recaptchaRef = useRef(null);

  const sendEmail = async (formData, recaptchaToken) => {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        'g-recaptcha-response': recaptchaToken
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        templateParams,
        EMAIL_CONFIG.publicKey
      );

      if (result.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulaire soumis');

    // Récupérer la valeur du reCAPTCHA
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      return;
    }

    try {
      setFormState('scanning');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormState('sending');
      const success = await sendEmail(formData, recaptchaValue);
      
      if (success) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        recaptchaRef.current.reset();
      } else {
        setFormState('error');
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setFormState('error');
    }

    setTimeout(() => {
      setFormState('idle');
    }, 3000);
  };

  const handleInputChange = (e) => {
    console.log('Input changé:', e.target.name);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-deadsec-dark border border-deadsec-blue/30 p-4 md:p-6 rounded-sm relative overflow-hidden z-20">
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
      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div className="space-y-1">
          <label className="block text-sm font-mono text-deadsec-blue">
            <span className="text-deadsec-purple">&gt;</span> Identifiant
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
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
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full h-32 bg-deadsec-gray/10 border border-deadsec-blue/30 p-3 text-white font-mono focus:border-deadsec-purple focus:outline-none transition-colors resize-none"
            placeholder="Entrez votre message..."
            required
          />
        </div>

        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_CONFIG.siteKey}
            theme="dark"
            size="normal"
            onChange={(value) => {
              console.log("reCAPTCHA value:", value);
            }}
            onErrored={(err) => {
              console.error("reCAPTCHA error:", err);
            }}
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