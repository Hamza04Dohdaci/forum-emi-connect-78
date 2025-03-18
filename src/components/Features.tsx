
import React from 'react';
import { Users, Building, Calendar, Briefcase, Mail, BarChart, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Users,
    title: 'Gestion des Contacts',
    description: 'Organisez et gérez efficacement votre réseau professionnel et éducatif.',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300',
  },
  {
    icon: Building,
    title: 'Partenaires',
    description: 'Développez des relations solides avec les entreprises et institutions.',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300',
  },
  {
    icon: Briefcase,
    title: 'Équipe',
    description: 'Collaborez efficacement avec tous les membres de votre équipe.',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300',
  },
  {
    icon: Calendar,
    title: 'Événements',
    description: 'Planifiez et organisez des événements professionnels impactants.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300',
  },
  {
    icon: Mail,
    title: 'Communication',
    description: 'Gardez un contact fluide avec tous vos collaborateurs et partenaires.',
    color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300',
  },
  {
    icon: BarChart,
    title: 'Statistiques',
    description: 'Analysez les performances et l\'impact de vos événements.',
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300',
  },
  {
    icon: Network,
    title: 'Réseautage',
    description: 'Facilitez les connexions entre étudiants et professionnels.',
    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-8 bg-gradient-to-b from-background to-emi-lightgray/30 dark:from-background dark:to-emi-blue/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-emi-gold uppercase tracking-wider mb-3 animate-fade-in">Fonctionnalités</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animation-delay-100">
            Tous les outils dont vous avez besoin
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in animation-delay-200">
            Forum EMI Entreprises offre une suite complète d'outils pour faciliter la collaboration entre le monde académique et professionnel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-card bg-white dark:bg-emi-blue/40 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-white/5 animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-6', feature.color)}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
