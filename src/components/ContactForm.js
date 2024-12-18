import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      e.target,
      'YOUR_PUBLIC_KEY'
    )
    .then((result) => {
      console.log('Email envoyé avec succès');
    }, (error) => {
      console.log('Erreur:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_name" placeholder="Nom" required />
      <input type="email" name="user_email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ContactForm; 