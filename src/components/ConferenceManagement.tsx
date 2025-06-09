
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

interface Conference {
  id: string;
  titre: string;
  description: string;
  dateHeure: string;
  duree: number;
  salle: string;
  intervenants: string[];
  entreprise: string;
}

const ConferenceManagement: React.FC = () => {
  const { conferences, speakers, addConference, updateConference, deleteConference } = useEvent();
  const { isAdmin } = useAuth();
  const [isAddingConference, setIsAddingConference] = useState(false);
  const [editingConference, setEditingConference] = useState<Conference | null>(null);
  const [newConference, setNewConference] = useState<Partial<Conference>>({
    intervenants: []
  });

  const salles = [
    'Salle polyvalente (480 personnes)',
    'Grand amphi (220 personnes)'
  ];

  const handleAddConference = () => {
    if (!newConference.titre || !newConference.dateHeure || !newConference.salle || !newConference.intervenants?.length) return;

    const conference: Conference = {
      id: Date.now().toString(),
      titre: newConference.titre,
      description: newConference.description || '',
      dateHeure: newConference.dateHeure,
      duree: newConference.duree || 60,
      salle: newConference.salle,
      intervenants: newConference.intervenants,
      entreprise: newConference.entreprise || ''
    };

    addConference(conference);
    setNewConference({ intervenants: [] });
    setIsAddingConference(false);
  };

  const handleEditConference = () => {
    if (!editingConference || !editingConference.titre || !editingConference.dateHeure || !editingConference.salle || !editingConference.intervenants?.length) return;

    updateConference(editingConference);
    setEditingConference(null);
  };

  const handleDeleteConference = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      deleteConference(id);
    }
  };

  const handleIntervenantToggle = (conference: Partial<Conference>, speakerName: string) => {
    const currentIntervenants = conference.intervenants || [];
    const isSelected = currentIntervenants.includes(speakerName);
    
    if (isSelected) {
      return {
        ...conference,
        intervenants: currentIntervenants.filter(name => name !== speakerName)
      };
    } else {
      return {
        ...conference,
        intervenants: [...currentIntervenants, speakerName]
      };
    }
  };

  const ConferenceForm = ({ 
    conference, 
    onChange, 
    onSubmit, 
    onCancel, 
    title 
  }: {
    conference: Partial<Conference>;
    onChange: (conference: Partial<Conference>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    title: string;
  }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <Label htmlFor="titre">Titre de la conférence *</Label>
          <Input
            id="titre"
            value={conference.titre || ''}
            onChange={(e) => onChange({...conference, titre: e.target.value})}
            placeholder="Titre de la conférence"
            disabled={!isAdmin}
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={conference.description || ''}
            onChange={(e) => onChange({...conference, description: e.target.value})}
            placeholder="Description de la conférence"
            disabled={!isAdmin}
          />
        </div>
        
        <div>
          <Label htmlFor="dateHeure">Date et Heure *</Label>
          <Input
            id="dateHeure"
            type="datetime-local"
            value={conference.dateHeure || ''}
            onChange={(e) => onChange({...conference, dateHeure: e.target.value})}
            disabled={!isAdmin}
          />
        </div>
        
        <div>
          <Label htmlFor="duree">Durée (minutes)</Label>
          <Input
            id="duree"
            type="number"
            value={conference.duree || 60}
            onChange={(e) => onChange({...conference, duree: parseInt(e.target.value)})}
            placeholder="60"
            disabled={!isAdmin}
          />
        </div>
        
        <div>
          <Label htmlFor="salle">Salle *</Label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={conference.salle || ''}
            onChange={(e) => onChange({...conference, salle: e.target.value})}
            disabled={!isAdmin}
          >
            <option value="">Sélectionnez une salle</option>
            {salles.map(salle => (
              <option key={salle} value={salle}>{salle}</option>
            ))}
          </select>
        </div>
        
        <div>
          <Label>Intervenants * (sélection multiple)</Label>
          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
            {speakers.map(speaker => (
              <div key={speaker.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id={`speaker-${speaker.id}`}
                  checked={conference.intervenants?.includes(speaker.nom) || false}
                  onChange={() => onChange(handleIntervenantToggle(conference, speaker.nom))}
                  disabled={!isAdmin}
                />
                <label htmlFor={`speaker-${speaker.id}`} className="text-sm">
                  {speaker.nom} ({speaker.entreprise})
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="entreprise">Entreprise organisatrice</Label>
          <Input
            id="entreprise"
            value={conference.entreprise || ''}
            onChange={(e) => onChange({...conference, entreprise: e.target.value})}
            placeholder="Nom de l'entreprise"
            disabled={!isAdmin}
          />
        </div>
        
        {isAdmin && (
          <div className="flex space-x-2">
            <Button onClick={onSubmit} className="flex-1">
              {title.includes('Ajouter') ? 'Ajouter' : 'Modifier'}
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1">
              Annuler
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Conférences</h2>
          <p className="text-muted-foreground">Planifiez et gérez les conférences de votre événement</p>
        </div>
        {isAdmin && (
          <Dialog open={isAddingConference} onOpenChange={setIsAddingConference}>
            <DialogTrigger asChild>
              <Button className="bg-emi-blue hover:bg-emi-darkblue">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Conférence
              </Button>
            </DialogTrigger>
            <ConferenceForm
              conference={newConference}
              onChange={setNewConference}
              onSubmit={handleAddConference}
              onCancel={() => setIsAddingConference(false)}
              title="Ajouter une Nouvelle Conférence"
            />
          </Dialog>
        )}
      </div>

      {/* Statistics Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-emi-blue" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Conférences</p>
              <p className="text-2xl font-bold">{conferences.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conferences Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Conférences</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Intervenants</TableHead>
                <TableHead>Entreprise</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {conferences.map((conference) => (
                <TableRow key={conference.id}>
                  <TableCell className="font-medium">{conference.titre}</TableCell>
                  <TableCell>
                    {new Date(conference.dateHeure).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>{conference.duree} min</TableCell>
                  <TableCell>{conference.salle}</TableCell>
                  <TableCell>{conference.intervenants.join(', ')}</TableCell>
                  <TableCell>{conference.entreprise}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingConference(conference)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          {editingConference && (
                            <ConferenceForm
                              conference={editingConference}
                              onChange={setEditingConference}
                              onSubmit={handleEditConference}
                              onCancel={() => setEditingConference(null)}
                              title="Modifier la Conférence"
                            />
                          )}
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteConference(conference.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConferenceManagement;
