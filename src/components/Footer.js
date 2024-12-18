const Footer = () => {
  return (
    <footer className="bg-deadsec-dark border-t border-deadsec-blue/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-deadsec-blue font-mono text-lg">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-deadsec-purple" />
                <span>thomas.savelli@corsdev.com</span>
              </p>
            </div>
          </div>

          {/* Liens Rapides */}
          <div className="space-y-4">
            <h3 className="text-deadsec-blue font-mono text-lg">Liens Rapides</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#skills" className="hover:text-deadsec-purple transition-colors">Compétences</a>
              <a href="#services" className="hover:text-deadsec-purple transition-colors">Services</a>
              <a href="#projects" className="hover:text-deadsec-purple transition-colors">Projets</a>
              <a href="#contact" className="hover:text-deadsec-purple transition-colors">Contact</a>
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div className="space-y-4">
            <h3 className="text-deadsec-blue font-mono text-lg">Réseaux</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Thomas-Savelli" target="_blank" rel="noopener noreferrer" 
                 className="text-deadsec-blue hover:text-deadsec-purple transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/thomas-savelli" target="_blank" rel="noopener noreferrer"
                 className="text-deadsec-blue hover:text-deadsec-purple transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-deadsec-blue/20 text-center text-sm">
          <p>© 2024 CorsDevTech. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 