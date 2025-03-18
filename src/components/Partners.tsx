
import React from 'react';
import { cn } from '@/lib/utils';

const partners = [
  { id: 1, name: 'Entreprise 1' },
  { id: 2, name: 'Entreprise 2' },
  { id: 3, name: 'Entreprise 3' },
  { id: 4, name: 'Entreprise 4' },
  { id: 5, name: 'Entreprise 5' },
  { id: 6, name: 'Entreprise 6' },
  { id: 7, name: 'Entreprise 7' },
  { id: 8, name: 'Entreprise 8' },
];

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-24 px-6 md:px-8 bg-emi-lightgray/30 dark:bg-emi-blue/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-emi-gold uppercase tracking-wider mb-3 animate-fade-in">Partenaires</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animation-delay-100">
            Ils nous font confiance
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in animation-delay-200">
            Forum EMI Entreprises collabore avec des entreprises et institutions prestigieuses pour créer des opportunités exceptionnelles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-emi-blue/40 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center aspect-square animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={cn(
                "partner-logo w-24 h-24 rounded-full flex items-center justify-center",
                index % 4 === 0 && "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
                index % 4 === 1 && "bg-purple-50 text-purple-600 dark:bg-purple-900/20",
                index % 4 === 2 && "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
                index % 4 === 3 && "bg-green-50 text-green-600 dark:bg-green-900/20",
              )}>
                <span className="font-bold text-lg">{partner.name.charAt(0)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-fade-in animation-delay-500">
          <p className="text-xl font-semibold mb-6">Envie de devenir partenaire ?</p>
          <button className="bg-emi-blue hover:bg-emi-darkblue text-white px-8 py-3 rounded-lg transition-colors">
            Contactez-nous
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
