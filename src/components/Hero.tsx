
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const handleStartClick = () => {
    window.location.hash = '#auth';
  };

  const handleLearnMoreClick = () => {
    window.open('https://www.forumemientreprises.com', '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-emi-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-emi-cyan/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0 relative z-10">
          <div className="inline-block px-3 py-1 bg-emi-blue/10 rounded-full text-emi-blue font-medium text-sm mb-6 animate-fade-in">
            <span className="mr-2 inline-flex items-center">
              <Zap size={14} className="mr-1 text-emi-gold" />
              31ème édition
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in animation-delay-100">
            <span className="block">Forum EMI Entreprise 2026</span>
            <span className="block text-balance">
              <span className="text-emi-blue dark:text-emi-gold">31ème édition</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in animation-delay-200">
            Indétrônable du palmarès des salons de recrutement au Maroc, le Forum EMI-Entreprises se dépasse d'année en année. Les éditions se succèdent, en gardant toujours son statut de Leader National.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
            <Button 
              onClick={handleStartClick}
              className="bg-emi-blue hover:bg-emi-darkblue text-white px-8 py-6 rounded-lg text-lg"
            >
              Démarrer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLearnMoreClick}
              className="border-emi-blue text-emi-blue hover:bg-emi-blue/5 px-8 py-6 rounded-lg text-lg"
            >
              En savoir plus
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative z-10 animate-fade-in animation-delay-300">
          <div className="relative aspect-video max-w-xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emi-gold/20 to-emi-cyan/20 rounded-2xl transform rotate-2"></div>
            <div className="absolute inset-0 bg-white dark:bg-emi-blue/90 glass dark:glass-dark rounded-2xl transform -rotate-2 shadow-xl"></div>
            <div className="relative glass dark:glass-dark rounded-2xl p-8 z-20 shadow-xl">
              <div className="bg-emi-lightgray dark:bg-emi-blue/60 rounded-xl h-full">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <div className="w-1/3 h-8 bg-emi-blue/10 dark:bg-white/5 rounded"></div>
                    <div className="w-1/4 h-8 bg-emi-gold/20 dark:bg-emi-gold/20 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-white dark:bg-white/5 rounded-lg shadow-sm"></div>
                    ))}
                  </div>
                  <div className="w-full h-40 bg-emi-cyan/10 dark:bg-white/5 rounded-lg mb-6"></div>
                  <div className="flex space-x-4">
                    <div className="w-1/3 h-10 bg-emi-blue dark:bg-emi-gold/80 rounded"></div>
                    <div className="w-1/3 h-10 bg-gray-200 dark:bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
