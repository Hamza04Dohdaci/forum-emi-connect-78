
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Building, LogIn } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const handleAuthClick = () => {
    window.location.hash = '#auth';
  };

  const handleManagementClick = () => {
    window.location.hash = '#management';
  };

  const handleHomeClick = () => {
    window.location.hash = '';
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={handleHomeClick}>
            <Logo />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-emi-blue">Forum EMI</h1>
              <p className="text-xs text-muted-foreground">Entreprises</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-emi-blue transition-colors">
              Fonctionnalités
            </a>
            <a href="#dashboard" className="text-sm font-medium text-gray-700 hover:text-emi-blue transition-colors">
              Tableau de bord
            </a>
            <a href="#partners" className="text-sm font-medium text-gray-700 hover:text-emi-blue transition-colors">
              Partenaires
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleManagementClick}
              className="hidden md:flex items-center"
            >
              <Building className="w-4 h-4 mr-2" />
              Gestion
            </Button>
            <Button 
              onClick={handleAuthClick}
              className="bg-emi-blue hover:bg-emi-darkblue"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Connexion
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
