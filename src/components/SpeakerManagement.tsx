
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, User, Building, BookOpen, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Speaker {
  id: string;
  nom: string;
  biographie: string;
  specialite: string;
  entreprise: string;
  email: string;
  telephone: string;
  conferences: string[];
}

const SpeakerManagement: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: '1',
      nom: 'Dr. Marie Dupont',
      biographie: 'Docteure en Intelligence Artificielle avec 15 ans d\'expérience dans le domaine de la recherche et du développement.',
      specialite: 'Intelligence Artificielle',
      entreprise: 'TechCorp Innovation',
      email: 'marie.dupont@techcorp.com',
      telephone: '+33 1 23 45 67 89',
      conferences: ['Innovation et IA', 'L\'avenir de l\'IA']
    },
    {
      id: '2',
      nom: 'Jean-Pierre Martin',
      biographie: 'Expert en cybersécurité et consultant pour de grandes entreprises internationales.',
      specialite: 'Cybersécurité',
      entreprise: 'SecureNet Solutions',
      email: 'jp.martin@securenet.com',
      telephone: '+33 1 98 76 54 32',
      conferences: ['Cybersécurité moderne']
    }
  ]);

  const [isAddingSpeaker, setIsAddingSpeaker] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [newSpeaker, setNewSpeaker] = useState<Partial<Speaker>>({
    conferences: []
  });

  const handleAddSpeaker = () => {
    if (!newSpeaker.nom || !newSpeaker.specialite || !newSpeaker.entreprise) return;

    const speaker: Speaker = {
      id: Date.now().toString(),
      nom: newSpeaker.nom,
      biographie: newSpeaker.biographie || '',
      specialite: newSpeaker.specialite,
      entreprise: newSpeaker.entreprise,
      email: newSpeaker.email || '',
      telephone: newSpeaker.telephone || '',
      conferences: newSpeaker.conferences || []
    };

    setSpeakers([...speakers, speaker]);
    setNewSpeaker({ conferences: [] });
    setIsAddingSpeaker(false);
  };

  const handleUpdateSpeaker = () => {
    if (!editingSpeaker) return;

    setSpeakers(speakers.map(speaker => 
      speaker.id === editingSpeaker.id ? editingSpeaker : speaker
    ));
    setEditingSpeaker(null);
  };

  const handleDeleteSpeaker = (id: string) => {
    setSpeakers(speakers.filter(speaker => speaker.id !== id));
  };

  const SpeakerCard = ({ speaker }: { speaker: Speaker }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{speaker.nom}</CardTitle>
            <Badge className="mt-2 bg-emi-blue text-white">
              {speaker.specialite}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingSpeaker(speaker)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteSpeaker(speaker.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="w-4 h-4 mr-2" />
          {speaker.entreprise}
        </div>
        
        {speaker.email && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="w-4 h-4 mr-2" />
            {speaker.email}
          </div>
        )}
        
        {speaker.telephone && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="w-4 h-4 mr-2" />
            {speaker.telephone}
          </div>
        )}

        {speaker.biographie && (
          <div>
            <div className="flex items-center text-sm font-medium mb-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Biographie
            </div>
            <p className="text-sm text-muted-foreground">
              {speaker.biographie.length > 100 
                ? `${speaker.biographie.substring(0, 100)}...` 
                : speaker.biographie
              }
            </p>
          </div>
        )}

        {speaker.conferences.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Conférences assignées:</p>
            <div className="flex flex-wrap gap-1">
              {speaker.conferences.map((conf, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {conf}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const SpeakerForm = ({ 
    speaker, 
    onSpeakerChange, 
    onSubmit, 
    title 
  }: { 
    speaker: Partial<Speaker>, 
    onSpeakerChange: (speaker: Partial<Speaker>) => void,
    onSubmit: () => void,
    title: string 
  }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nom">Nom complet</Label>
            <Input
              id="nom"
              value={speaker.nom || ''}
              onChange={(e) => onSpeakerChange({...speaker, nom: e.target.value})}
              placeholder="Dr. Jean Dupont"
            />
          </div>
          <div>
            <Label htmlFor="specialite">Spécialité</Label>
            <Input
              id="specialite"
              value={speaker.specialite || ''}
              onChange={(e) => onSpeakerChange({...speaker, specialite: e.target.value})}
              placeholder="Intelligence Artificielle"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="entreprise">Entreprise</Label>
          <Input
            id="entreprise"
            value={speaker.entreprise || ''}
            onChange={(e) => onSpeakerChange({...speaker, entreprise: e.target.value})}
            placeholder="TechCorp Innovation"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={speaker.email || ''}
              onChange={(e) => onSpeakerChange({...speaker, email: e.target.value})}
              placeholder="jean.dupont@entreprise.com"
            />
          </div>
          <div>
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={speaker.telephone || ''}
              onChange={(e) => onSpeakerChange({...speaker, telephone: e.target.value})}
              placeholder="+33 1 23 45 67 89"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="biographie">Biographie</Label>
          <Textarea
            id="biographie"
            value={speaker.biographie || ''}
            onChange={(e) => onSpeakerChange({...speaker, biographie: e.target.value})}
            placeholder="Décrivez l'expérience et les qualifications de l'intervenant..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="conferences">Conférences (séparées par des virgules)</Label>
          <Input
            id="conferences"
            value={speaker.conferences?.join(', ') || ''}
            onChange={(e) => onSpeakerChange({
              ...speaker, 
              conferences: e.target.value.split(',').map(s => s.trim()).filter(s => s)
            })}
            placeholder="Innovation et IA, Futur de la technologie"
          />
        </div>

        <Button onClick={onSubmit} className="w-full">
          {title.includes('Modifier') ? 'Mettre à jour' : 'Ajouter l\'intervenant'}
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Intervenants</h2>
          <p className="text-muted-foreground">Gérez les speakers et experts de vos conférences</p>
        </div>
        <Dialog open={isAddingSpeaker} onOpenChange={setIsAddingSpeaker}>
          <DialogTrigger asChild>
            <Button className="bg-emi-blue hover:bg-emi-darkblue">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Intervenant
            </Button>
          </DialogTrigger>
          <SpeakerForm
            speaker={newSpeaker}
            onSpeakerChange={setNewSpeaker}
            onSubmit={handleAddSpeaker}
            title="Ajouter un Nouvel Intervenant"
          />
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-emi-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Intervenants</p>
                <p className="text-2xl font-bold">{speakers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-emi-gold" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Entreprises</p>
                <p className="text-2xl font-bold">
                  {new Set(speakers.map(s => s.entreprise)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-emi-cyan" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Spécialités</p>
                <p className="text-2xl font-bold">
                  {new Set(speakers.map(s => s.specialite)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>

      {/* Edit Dialog */}
      {editingSpeaker && (
        <Dialog open={!!editingSpeaker} onOpenChange={() => setEditingSpeaker(null)}>
          <SpeakerForm
            speaker={editingSpeaker}
            onSpeakerChange={setEditingSpeaker}
            onSubmit={handleUpdateSpeaker}
            title="Modifier l'Intervenant"
          />
        </Dialog>
      )}
    </div>
  );
};

export default SpeakerManagement;
