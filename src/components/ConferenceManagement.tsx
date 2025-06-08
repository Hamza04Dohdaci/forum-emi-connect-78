
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, MapPin, Users, Plus, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Conference {
  id: string;
  titre: string;
  dateDebut: string;
  dateFin: string;
  salle: {
    numero: number;
    capacite: number;
  };
  intervenants: string[];
}

const ConferenceManagement: React.FC = () => {
  const [conferences, setConferences] = useState<Conference[]>([
    {
      id: '1',
      titre: 'Innovation et IA',
      dateDebut: '2024-06-08T09:00',
      dateFin: '2024-06-08T10:30',
      salle: { numero: 101, capacite: 50 },
      intervenants: ['Dr. Martin Dupont', 'Sarah Tech']
    },
    {
      id: '2',
      titre: 'Cybersécurité moderne',
      dateDebut: '2024-06-08T11:00',
      dateFin: '2024-06-08T12:30',
      salle: { numero: 102, capacite: 80 },
      intervenants: ['Alex Secure']
    }
  ]);

  const [isAddingConference, setIsAddingConference] = useState(false);
  const [newConference, setNewConference] = useState<Partial<Conference>>({
    intervenants: []
  });
  const [conflictError, setConflictError] = useState<string>('');

  const salles = [
    { numero: 101, capacite: 50 },
    { numero: 102, capacite: 80 },
    { numero: 103, capacite: 120 },
    { numero: 201, capacite: 30 }
  ];

  const checkRoomConflict = (salle: number, debut: string, fin: string, excludeId?: string) => {
    const newStart = new Date(debut);
    const newEnd = new Date(fin);

    for (const conf of conferences) {
      if (conf.id === excludeId) continue;
      if (conf.salle.numero !== salle) continue;

      const existingStart = new Date(conf.dateDebut);
      const existingEnd = new Date(conf.dateFin);

      // Check for overlap
      if (!(newEnd <= existingStart || newStart >= existingEnd)) {
        return `Conflit avec "${conf.titre}" (${existingStart.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${existingEnd.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})`;
      }
    }
    return null;
  };

  const handleAddConference = () => {
    if (!newConference.titre || !newConference.dateDebut || !newConference.dateFin || !newConference.salle) {
      return;
    }

    const conflict = checkRoomConflict(
      newConference.salle.numero,
      newConference.dateDebut,
      newConference.dateFin
    );

    if (conflict) {
      setConflictError(conflict);
      return;
    }

    const conference: Conference = {
      id: Date.now().toString(),
      titre: newConference.titre,
      dateDebut: newConference.dateDebut,
      dateFin: newConference.dateFin,
      salle: newConference.salle,
      intervenants: newConference.intervenants || []
    };

    setConferences([...conferences, conference]);
    setNewConference({ intervenants: [] });
    setConflictError('');
    setIsAddingConference(false);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('fr-FR'),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Conférences</h2>
          <p className="text-muted-foreground">Planifiez et organisez vos conférences avec détection automatique des conflits</p>
        </div>
        <Dialog open={isAddingConference} onOpenChange={setIsAddingConference}>
          <DialogTrigger asChild>
            <Button className="bg-emi-blue hover:bg-emi-darkblue">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Conférence
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une Nouvelle Conférence</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="titre">Titre de la Conférence</Label>
                <Input
                  id="titre"
                  value={newConference.titre || ''}
                  onChange={(e) => setNewConference({...newConference, titre: e.target.value})}
                  placeholder="Ex: Intelligence Artificielle et Futur"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateDebut">Date et Heure de Début</Label>
                  <Input
                    id="dateDebut"
                    type="datetime-local"
                    value={newConference.dateDebut || ''}
                    onChange={(e) => setNewConference({...newConference, dateDebut: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dateFin">Date et Heure de Fin</Label>
                  <Input
                    id="dateFin"
                    type="datetime-local"
                    value={newConference.dateFin || ''}
                    onChange={(e) => {
                      setNewConference({...newConference, dateFin: e.target.value});
                      setConflictError('');
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="salle">Salle</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newConference.salle?.numero || ''}
                  onChange={(e) => {
                    const salleNum = Number(e.target.value);
                    const salle = salles.find(s => s.numero === salleNum);
                    setNewConference({...newConference, salle});
                    setConflictError('');
                  }}
                >
                  <option value="">Sélectionner une salle</option>
                  {salles.map(salle => (
                    <option key={salle.numero} value={salle.numero}>
                      Salle {salle.numero} (Capacité: {salle.capacite} personnes)
                    </option>
                  ))}
                </select>
              </div>

              {conflictError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {conflictError}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="intervenants">Intervenants (séparés par des virgules)</Label>
                <Textarea
                  id="intervenants"
                  value={newConference.intervenants?.join(', ') || ''}
                  onChange={(e) => setNewConference({
                    ...newConference, 
                    intervenants: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  placeholder="Dr. Marie Martin, Jean Dupont, ..."
                />
              </div>

              <Button onClick={handleAddConference} className="w-full" disabled={!!conflictError}>
                Créer la Conférence
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Conference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conferences.map((conference) => {
          const debut = formatDateTime(conference.dateDebut);
          const fin = formatDateTime(conference.dateFin);
          
          return (
            <Card key={conference.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{conference.titre}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {debut.date}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {debut.time} - {fin.time}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  Salle {conference.salle.numero}
                  <Badge variant="outline" className="ml-2">
                    {conference.salle.capacite} places
                  </Badge>
                </div>
                
                {conference.intervenants.length > 0 && (
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      Intervenants
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {conference.intervenants.map((intervenant, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {intervenant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ConferenceManagement;
