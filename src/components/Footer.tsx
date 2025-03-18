
import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emi-blue text-white pt-16 pb-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Logo variant="light" />
            <p className="text-emi-lightgray/80 max-w-xs">
              Connecter l'éducation au monde professionnel à travers des événements collaboratifs et innovants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-emi-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-emi-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-emi-gold transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-emi-gold transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-emi-lightgray/80 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#features" className="text-emi-lightgray/80 hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#dashboard" className="text-emi-lightgray/80 hover:text-white transition-colors">Tableau de bord</a></li>
              <li><a href="#partners" className="text-emi-lightgray/80 hover:text-white transition-colors">Partenaires</a></li>
              <li><a href="#" className="text-emi-lightgray/80 hover:text-white transition-colors">À propos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Légal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-emi-lightgray/80 hover:text-white transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-emi-lightgray/80 hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-emi-lightgray/80 hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-emi-lightgray/80 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={18} className="mr-3 text-emi-gold" />
                <span className="text-emi-lightgray/80">123 Rue de l'Innovation, 75000 Paris</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-emi-gold" />
                <a href="mailto:contact@forumemi.fr" className="text-emi-lightgray/80 hover:text-white transition-colors">contact@forumemi.fr</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-emi-gold" />
                <a href="tel:+33123456789" className="text-emi-lightgray/80 hover:text-white transition-colors">+33 1 23 45 67 89</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emi-lightgray/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Forum EMI Entreprises. Tous droits réservés.
          </p>
          <p className="text-emi-lightgray/60 text-sm">
            Conçu avec passion pour l'innovation éducative et professionnelle.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
