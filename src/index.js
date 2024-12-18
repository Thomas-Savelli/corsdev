import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { init } from '@emailjs/browser';
import { EMAIL_CONFIG } from './config/email';

// Gestionnaire d'erreurs global
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Erreur détectée:', {
    message: msg,
    url: url,
    line: lineNo,
    column: columnNo,
    error: error
  });
  return false;
};

// Gestionnaire pour les promesses non gérées
window.onunhandledrejection = function(event) {
  console.error('Promesse non gérée:', event.reason);
};

// Initialisation directe avec la clé
init('Cl_lTmHTiDnhgFy6O');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);