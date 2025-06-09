
import React from 'react';
import { 
  Calendar, 
  Users, 
  ArrowUpRight,
  Briefcase,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

const data = [
  { name: 'Jan', participants: 20, partenaires: 5 },
  { name: 'Fév', participants: 35, partenaires: 8 },
  { name: 'Mar', participants: 45, partenaires: 10 },
  { name: 'Avr', participants: 30, partenaires: 7 },
  { name: 'Mai', participants: 55, partenaires: 12 },
  { name: 'Jun', participants: 40, partenaires: 9 },
];

const Dashboard: React.FC = () => {
  const { companies, contracts, speakers } = useEvent();
  const { isAuthenticated, isAdmin } = useAuth();

  const statCards = [
    { 
      title: 'Entreprises',
      value: companies.length.toString(),
      change: '+7%',
      icon: Building,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
    },
    { 
      title: 'Partenaires',
      value: contracts.length.toString(),
      change: '+15%',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300'
    },
    { 
      title: 'Conférences',
      value: '5',
      change: '+12%',
      icon: Calendar,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300'
    },
    { 
      title: 'Intervenants',
      value: speakers.length.toString(),
      change: '+18%',
      icon: Users,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300'
    },
  ];

  const handleManagementClick = () => {
    window.location.hash = '#management';
  };

  return (
    <section id="dashboard" className="py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          <div>
            <h2 className="text-sm font-semibold text-emi-gold uppercase tracking-wider mb-3 animate-fade-in">Tableau de bord</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 animate-fade-in animation-delay-100">
              Visualisez vos données en temps réel
            </h3>
          </div>
          {isAuthenticated && isAdmin && (
            <Button 
              variant="outline" 
              className="group border-emi-blue text-emi-blue hover:bg-emi-blue/5 animate-fade-in animation-delay-200"
              onClick={handleManagementClick}
            >
              Accéder au tableau de bord complet
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div 
              key={card.title}
              className="bg-white dark:bg-emi-blue/40 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', card.color)}>
                  <card.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full flex items-center">
                  {card.change}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </span>
              </div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">{card.title}</h4>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-emi-blue/40 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5 animate-fade-in animation-delay-300">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold">Tendances de participation</h4>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} 
                  contentStyle={{ 
                    borderRadius: '0.5rem', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }} 
                />
                <Bar dataKey="participants" fill="#1A365D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="partenaires" fill="#FFD700" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
