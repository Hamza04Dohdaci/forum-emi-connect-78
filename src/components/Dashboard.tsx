
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Building2, Calendar, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Entreprises Participantes",
      value: "150+",
      icon: Building2,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Conférences Prévues",
      value: "25",
      icon: Calendar,
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Participants Attendus",
      value: "2,500+",
      icon: Users,
      change: "+18%",
      changeType: "positive"
    },
    {
      title: "Croissance vs 2025",
      value: "22%",
      icon: TrendingUp,
      change: "+8%",
      changeType: "positive"
    }
  ];

  const sectorsData = [
    { name: 'Technologies', value: 35, color: '#2563eb' },
    { name: 'Finance', value: 25, color: '#dc2626' },
    { name: 'Industrie', value: 20, color: '#16a34a' },
    { name: 'Services', value: 15, color: '#ea580c' },
    { name: 'Autres', value: 5, color: '#7c3aed' }
  ];

  const participationData = [
    { annee: '2020', participants: 1800 },
    { annee: '2021', participants: 1950 },
    { annee: '2022', participants: 2100 },
    { annee: '2023', participants: 2200 },
    { annee: '2024', participants: 2350 },
    { annee: '2026', participants: 2500 }
  ];

  const dailySchedule = [
    { jour: 'Lundi 9', conferences: 8, stands: 45 },
    { jour: 'Mardi 10', conferences: 12, stands: 48 },
    { jour: 'Mercredi 11', conferences: 15, stands: 50 },
    { jour: 'Jeudi 12', conferences: 10, stands: 47 },
    { jour: 'Vendredi 13', conferences: 7, stands: 42 }
  ];

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emi-blue mb-4">
            Tableau de Bord Forum EMI 2026
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Suivez en temps réel les statistiques et métriques clés de la 31ème édition
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-emi-blue">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} vs 2025
                    </p>
                  </div>
                  <div className="p-3 bg-emi-blue/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-emi-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sectors Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition par Secteur</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sectorsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Participation Evolution */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="annee" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="participants" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Daily Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Programme par Jour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySchedule}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conferences" fill="#2563eb" name="Conférences" />
                <Bar dataKey="stands" fill="#16a34a" name="Stands Actifs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
