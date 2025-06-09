
import React from 'react';
import { Building, Grid3X3, FileText, User, Calendar, CheckSquare } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Building,
      title: 'Entreprises',
      description: 'Gestion complète des entreprises partenaires et de leurs informations.'
    },
    {
      icon: Grid3X3,
      title: 'Stands',
      description: 'Allocation et management des espaces d\'exposition pour les entreprises.'
    },
    {
      icon: FileText,
      title: 'Contrats',
      description: 'Suivi des contrats de partenariat et des engagements financiers.'
    },
    {
      icon: User,
      title: 'Intervenants',
      description: 'Coordination des speakers et experts pour les conférences.'
    },
    {
      icon: Calendar,
      title: 'Conférences',
      description: 'Planification et organisation des sessions de présentation.'
    },
    {
      icon: CheckSquare,
      title: 'Tâches',
      description: 'Suivi et coordination des activités de l\'équipe logistique.'
    }
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-8 bg-emi-lightgray dark:bg-emi-blue/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-emi-gold uppercase tracking-wider mb-3 animate-fade-in">
            Fonctionnalités
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in animation-delay-100">
            Ce système d'information propre à Forum EMI Entreprise offre une suite complète d'outils pour faciliter la centralisation des données.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-emi-blue/40 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 bg-emi-blue/10 dark:bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emi-blue dark:text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
