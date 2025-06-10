
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Building, Users, Target, Award } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';

const AdvancedAnalytics: React.FC = () => {
  const { companies, contracts, stands, conferences } = useEvent();

  // Secteurs d'activité prédéfinis
  const secteurMapping = {
    'Technologies': 'Technologies',
    'Cybersécurité': 'Technologies',
    'Finance': 'Finance',
    'Banque': 'Finance', 
    'Assurance': 'Finance',
    'Industrie': 'Industrie',
    'Manufacturing': 'Industrie',
    'Automobile': 'Industrie',
    'Services': 'Services',
    'Consulting': 'Services',
    'RH': 'Services',
    'Éducation': 'Éducation',
    'Formation': 'Éducation',
    'Santé': 'Santé',
    'Pharmaceutique': 'Santé',
    'Énergie': 'Énergie',
    'Télécommunications': 'Télécommunications'
  };

  // Normaliser les secteurs
  const normalizeCompanies = companies.map(company => ({
    ...company,
    secteurNormalise: secteurMapping[company.secteur] || 'Autres'
  }));

  // Analyse par secteur d'activité
  const secteurStats = Object.entries(
    normalizeCompanies.reduce((acc, company) => {
      const secteur = company.secteurNormalise;
      if (!acc[secteur]) {
        acc[secteur] = { 
          count: 0, 
          revenue: 0, 
          contracts: 0,
          stands: 0 
        };
      }
      acc[secteur].count++;
      
      // Calculer le CA par secteur
      const companyContracts = contracts.filter(c => c.partenaire === company.nom);
      acc[secteur].revenue += companyContracts.reduce((sum, c) => sum + c.montant, 0);
      acc[secteur].contracts += companyContracts.length;
      
      // Calculer les stands par secteur
      const companyStands = stands.filter(s => s.entreprise === company.nom);
      acc[secteur].stands += companyStands.length;
      
      return acc;
    }, {} as Record<string, any>)
  ).map(([secteur, stats]) => ({
    secteur,
    entreprises: stats.count,
    chiffreAffaires: stats.revenue,
    contrats: stats.contracts,
    stands: stats.stands,
    caParEntreprise: stats.count > 0 ? Math.round(stats.revenue / stats.count) : 0
  })).sort((a, b) => b.chiffreAffaires - a.chiffreAffaires);

  // Analyse temporelle des contrats
  const contractsTimeline = contracts.reduce((acc, contract) => {
    const month = new Date(contract.dateSignature).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, montant: 0, count: 0 };
    }
    acc[month].montant += contract.montant;
    acc[month].count++;
    return acc;
  }, {} as Record<string, any>);

  const timelineData = Object.values(contractsTimeline).slice(-6);

  // Analyse des types de contrats
  const contractTypeAnalysis = [
    { 
      type: 'DIAMOND', 
      count: contracts.filter(c => c.type === 'DIAMOND').length,
      revenue: contracts.filter(c => c.type === 'DIAMOND').reduce((sum, c) => sum + c.montant, 0),
      color: '#3b82f6'
    },
    { 
      type: 'GOLD', 
      count: contracts.filter(c => c.type === 'GOLD').length,
      revenue: contracts.filter(c => c.type === 'GOLD').reduce((sum, c) => sum + c.montant, 0),
      color: '#f59e0b'
    },
    { 
      type: 'SILVER', 
      count: contracts.filter(c => c.type === 'SILVER').length,
      revenue: contracts.filter(c => c.type === 'SILVER').reduce((sum, c) => sum + c.montant, 0),
      color: '#6b7280'
    }
  ];

  // Métriques clés
  const totalRevenue = contracts.reduce((sum, c) => sum + c.montant, 0);
  const averageContractValue = contracts.length > 0 ? totalRevenue / contracts.length : 0;
  const occupiedStands = stands.filter(s => s.statut === 'OCCUPE').length;
  const occupancyRate = stands.length > 0 ? (occupiedStands / stands.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Métriques Financières */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">CA Total</p>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} MAD</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">CA Moyen/Contrat</p>
                <p className="text-2xl font-bold">{Math.round(averageContractValue).toLocaleString()} MAD</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Taux Occupation</p>
                <p className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Secteurs Actifs</p>
                <p className="text-2xl font-bold">{secteurStats.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyses Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CA par Secteur */}
        <Card>
          <CardHeader>
            <CardTitle>Chiffre d'Affaires par Secteur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={secteurStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="secteur" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'chiffreAffaires' ? `${value.toLocaleString()} MAD` : value,
                    name === 'chiffreAffaires' ? 'CA' : 'Entreprises'
                  ]}
                />
                <Bar dataKey="chiffreAffaires" fill="#3b82f6" name="CA (MAD)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition Types de Contrats */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Type de Contrat</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contractTypeAnalysis}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="revenue"
                  label={({ type, revenue }) => `${type}: ${(revenue/1000).toFixed(0)}k MAD`}
                >
                  {contractTypeAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value.toLocaleString()} MAD`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Évolution Temporelle */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Contrats (6 derniers mois)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'montant' ? `${value.toLocaleString()} MAD` : value,
                    name === 'montant' ? 'Montant' : 'Nombre'
                  ]}
                />
                <Area type="monotone" dataKey="montant" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Analyse Performance par Secteur */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par Secteur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={secteurStats.slice(0, 6)} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="secteur" type="category" width={80} />
                <Tooltip 
                  formatter={(value: any) => [`${value.toLocaleString()} MAD`, 'CA Moyen/Entreprise']}
                />
                <Bar dataKey="caParEntreprise" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tableau Détaillé */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse Détaillée par Secteur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Secteur</th>
                  <th className="text-right p-2">Entreprises</th>
                  <th className="text-right p-2">CA Total</th>
                  <th className="text-right p-2">CA Moyen</th>
                  <th className="text-right p-2">Contrats</th>
                  <th className="text-right p-2">Stands</th>
                </tr>
              </thead>
              <tbody>
                {secteurStats.map((secteur) => (
                  <tr key={secteur.secteur} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{secteur.secteur}</td>
                    <td className="p-2 text-right">{secteur.entreprises}</td>
                    <td className="p-2 text-right font-semibold">{secteur.chiffreAffaires.toLocaleString()} MAD</td>
                    <td className="p-2 text-right">{secteur.caParEntreprise.toLocaleString()} MAD</td>
                    <td className="p-2 text-right">{secteur.contrats}</td>
                    <td className="p-2 text-right">{secteur.stands}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
