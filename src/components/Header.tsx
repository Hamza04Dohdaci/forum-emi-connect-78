
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '#' },
    { label: 'Événements', href: '#events' },
    { label: 'Partenaires', href: '#partners' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'À propos', href: '#about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8',
        isScrolled ? 'bg-white/80 dark:bg-emi-blue/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo size="md" variant={isScrolled ? 'default' : 'default'} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className={cn(
                'font-medium transition-colors duration-200 link-hover',
                isScrolled ? 'text-emi-blue dark:text-white' : 'text-emi-blue dark:text-white'
              )}
            >
              {item.label}
            </a>
          ))}
          <Button className="bg-emi-blue text-white hover:bg-emi-darkblue">
            Connexion
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-emi-blue dark:text-white"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-emi-blue shadow-lg animate-fade-in">
          <div className="p-5 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-emi-blue dark:text-white font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="bg-emi-blue text-white hover:bg-emi-darkblue w-full justify-center">
              Connexion
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
