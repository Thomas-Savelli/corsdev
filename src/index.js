import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { init } from '@emailjs/browser';
import { EMAIL_CONFIG } from './config/email';

init({
  publicKey: EMAIL_CONFIG.publicKey,
  limitRate: {
    throttle: 2000
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);