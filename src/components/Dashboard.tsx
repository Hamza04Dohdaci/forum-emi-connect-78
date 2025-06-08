import React from 'react';
import { 
  BarChart as BarChartIcon, 
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

const data = [
  { name: 'Jan', participants: 20, partenaires: 5 },
  { name: 'Fév', participants: 35, partenaires: 8 },
  { name: 'Mar', participants: 45, partenaires: 10 },
  { name: 'Avr', participants: 30, partenaires: 7 },
  { name: 'Mai', participants: 55, partenaires: 12 },
  { name: 'Jun', participants: 40, partenaires: 9 },
];

const Dashboard: React.FC = () => {
  const { companies, contracts, speakers, stands } = useEvent();

  const totalParticipants = companies.reduce((sum, company) => sum + company.nombreEmployes, 0);
  const totalRevenue = contracts.reduce((sum, contract) => sum + contract.montant, 0);
  const occupiedStands = stands.filter(stand => stand.statut === 'OCCUPE').length;

  const statCards = [
    { 
      title: 'Événements',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
    },
    { 
      title: 'Participants',
      value: totalParticipants.toLocaleString(),
      change: '+18%',
      icon: Users,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300'
    },
    { 
      title: 'Entreprises',
      value: companies.length.toString(),
      change: '+7%',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300'
    },
    { 
      title: 'Partenariats',
      value: contracts.length.toString(),
      change: '+15%',
      icon: Building,
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
          <Button 
            variant="outline" 
            className="group border-emi-blue text-emi-blue hover:bg-emi-blue/5 animate-fade-in animation-delay-200"
            onClick={handleManagementClick}
          >
            Accéder au tableau de bord complet
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
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

        {/* Revenue Display */}
        <div className="mb-8">
          <div className="bg-white dark:bg-emi-blue/40 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex items-center">
              <div className="text-green-600 text-2xl font-bold">€</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()}€</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full flex items-center">
                  +22%
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-emi-blue/40 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5 animate-fade-in animation-delay-300">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold">Tendances de participation</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChartIcon className="w-4 h-4 mr-2" />
                Statistiques 2023
              </div>
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

          <div className="bg-white dark:bg-emi-blue/40 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5 animate-fade-in animation-delay-500">
            <h4 className="font-semibold mb-6">Événements à venir</h4>
            <div className="space-y-4">
              {[
                { title: 'Forum Tech Innovation', date: '15 juin 2023', attendees: 120 },
                { title: 'Workshop Design Thinking', date: '22 juin 2023', attendees: 45 },
                { title: 'Conférence IA & Éducation', date: '7 juillet 2023', attendees: 80 },
                { title: 'Hackathon Startups', date: '18 juillet 2023', attendees: 150 },
              ].map((event, i) => (
                <div key={i} className="flex items-start p-3 rounded-lg hover:bg-emi-lightgray dark:hover:bg-white/5 transition-colors">
                  <div className="mr-4 w-12 h-12 bg-emi-blue/10 dark:bg-white/10 rounded-lg flex items-center justify-center text-emi-blue dark:text-white font-semibold">
                    {event.date.split(' ')[0]}
                  </div>
                  <div>
                    <h5 className="font-medium">{event.title}</h5>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {event.date}
                      <span className="mx-2">•</span>
                      <Users className="w-3.5 h-3.5 mr-1.5" />
                      {event.attendees} participants
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-6 text-emi-blue border-emi-blue hover:bg-emi-blue/5 flex items-center justify-center"
              onClick={handleManagementClick}
            >
              Voir tous les événements
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
