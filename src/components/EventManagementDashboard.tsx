
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Building, FileText, CheckSquare, BarChart3, User, Grid3X3, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import ContractManagement from './ContractManagement';
import ConferenceManagement from './ConferenceManagement';
import TaskManagement from './TaskManagement';
import SpeakerManagement from './SpeakerManagement';
import StandManagement from './StandManagement';
import CompanyManagement from './CompanyManagement';

const EventManagementDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { companies, contracts, speakers, stands, conferences, tasks } = useEvent();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Calculate real-time statistics
  const totalRevenue = contracts.reduce((sum, contract) => sum + contract.montant, 0);
  const occupiedStands = stands.filter(stand => stand.statut === 'OCCUPE').length;
  const totalSpeakers = speakers.length;
  const totalCompanies = companies.length;
  const totalContracts = contracts.length;
  const totalConferences = conferences.length;
  const pendingTasks = tasks.filter(task => task.statut === 'EN_ATTENTE').length;
  const completedTasks = tasks.filter(task => task.statut === 'TERMINEE').length;

  const recentActivities = [
    { id: 1, action: 'Nouveau contrat DIAMOND signé', entity: 'TechCorp Innovation', time: '2h' },
    { id: 2, action: 'Conférence "IA et Innovation" programmée', entity: 'Amphithéâtre A', time: '4h' },
    { id: 3, action: 'Intervenant Dr. Martin ajouté', entity: 'TechCorp', time: '5h' },
    { id: 4, action: 'Stand 7 alloué', entity: 'InnovaSoft', time: '6h' },
    { id: 5, action: 'Entreprise SecureNet ajoutée', entity: 'Zone B', time: '1j' }
  ];

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-emi-blue mb-2">Forum EMI 2026 - 31ème édition</h1>
            <p className="text-muted-foreground">Plateforme de gestion de Forum EMI Entreprises 2026</p>
          </div>
          <Button onClick={handleHomeClick} variant="outline" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Entreprise
            </TabsTrigger>
            <TabsTrigger value="stands" className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              Stands
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Contrats
            </TabsTrigger>
            <TabsTrigger value="speakers" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Intervenants
            </TabsTrigger>
            <TabsTrigger value="conferences" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Conférences
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Tâches
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Building className="h-8 w-8 text-emi-blue" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Entreprises</p>
                      <p className="text-2xl font-bold">{totalCompanies}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-emi-gold" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Partenaires</p>
                      <p className="text-2xl font-bold">{totalContracts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-emi-cyan" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Conférences</p>
                      <p className="text-2xl font-bold">{totalConferences}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Intervenants</p>
                      <p className="text-2xl font-bold">{totalSpeakers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Grid3X3 className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Stands</p>
                      <p className="text-2xl font-bold">{occupiedStands}/{stands.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckSquare className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Tâches en cours</p>
                      <p className="text-2xl font-bold">{pendingTasks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckSquare className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Tâches terminées</p>
                      <p className="text-2xl font-bold">{completedTasks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activités Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="w-2 h-2 bg-emi-blue rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.entity}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          il y a {activity.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {isAdmin && (
                <Card>
                  <CardHeader>
                    <CardTitle>Actions Rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('companies')}
                    >
                      <Building className="w-4 h-4 mr-2" />
                      Ajouter une entreprise
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('contracts')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Créer un nouveau contrat
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('conferences')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Programmer une conférence
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('speakers')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Ajouter un intervenant
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('stands')}
                    >
                      <Grid3X3 className="w-4 h-4 mr-2" />
                      Allouer un stand
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab('tasks')}
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      Assigner une tâche
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contracts">
            <ContractManagement />
          </TabsContent>

          <TabsContent value="conferences">
            <ConferenceManagement />
          </TabsContent>

          <TabsContent value="speakers">
            <SpeakerManagement />
          </TabsContent>

          <TabsContent value="companies">
            <CompanyManagement />
          </TabsContent>

          <TabsContent value="stands">
            <StandManagement />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventManagementDashboard;
