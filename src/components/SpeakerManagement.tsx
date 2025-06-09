
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

interface Speaker {
  id: string;
  nom: string;
  biographie: string;
  specialite: string;
  entreprise: string;
  email: string;
  telephone: string;
}

const SpeakerManagement: React.FC = () => {
  const { speakers, companies, addSpeaker, updateSpeaker, deleteSpeaker } = useEvent();
  const { isAdmin } = useAuth();
  const [isAddingSpeaker, setIsAddingSpeaker] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [newSpeaker, setNewSpeaker] = useState<Partial<Speaker>>({});

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-emi-blue mb-4">Gestion des Intervenants</h2>
        <div className="space-y-6">
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
            <CardHeader>
              <CardTitle>Liste des Intervenants</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {speakers.map((speaker) => (
                    <TableRow key={speaker.id}>
                      <TableCell className="font-medium">{speaker.nom}</TableCell>
                      <TableCell>{speaker.specialite}</TableCell>
                      <TableCell>{speaker.entreprise}</TableCell>
                      <TableCell>{speaker.email}</TableCell>
                      <TableCell>{speaker.telephone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddSpeaker = () => {
    if (!newSpeaker.nom || !newSpeaker.specialite || !newSpeaker.entreprise || !newSpeaker.email) return;

    const speaker: Speaker = {
      id: Date.now().toString(),
      nom: newSpeaker.nom,
      biographie: newSpeaker.biographie || '',
      specialite: newSpeaker.specialite,
      entreprise: newSpeaker.entreprise,
      email: newSpeaker.email,
      telephone: newSpeaker.telephone || ''
    };

    addSpeaker(speaker);
    setNewSpeaker({});
    setIsAddingSpeaker(false);
  };

  const handleEditSpeaker = () => {
    if (!editingSpeaker || !editingSpeaker.nom || !editingSpeaker.specialite || !editingSpeaker.entreprise || !editingSpeaker.email) return;

    updateSpeaker(editingSpeaker);
    setEditingSpeaker(null);
  };

  const handleDeleteSpeaker = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet intervenant ?')) {
      deleteSpeaker(id);
    }
  };

  const companyOptions = [
    ...companies.map(company => company.nom),
    'Autre'
  ];

  const SpeakerForm = ({ 
    speaker, 
    onChange, 
    onSubmit, 
    onCancel, 
    title 
  }: {
    speaker: Partial<Speaker>;
    onChange: (speaker: Partial<Speaker>) => void;
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
          <Label htmlFor="nom">Nom complet *</Label>
          <Input
            id="nom"
            value={speaker.nom || ''}
            onChange={(e) => onChange({...speaker, nom: e.target.value})}
            placeholder="Nom de l'intervenant"
          />
        </div>
        
        <div>
          <Label htmlFor="specialite">Spécialité *</Label>
          <Input
            id="specialite"
            value={speaker.specialite || ''}
            onChange={(e) => onChange({...speaker, specialite: e.target.value})}
            placeholder="Domaine d'expertise"
          />
        </div>
        
        <div>
          <Label htmlFor="entreprise">Entreprise *</Label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={speaker.entreprise || ''}
            onChange={(e) => onChange({...speaker, entreprise: e.target.value})}
          >
            <option value="">Sélectionnez une entreprise</option>
            {companyOptions.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="biographie">Biographie</Label>
          <Textarea
            id="biographie"
            value={speaker.biographie || ''}
            onChange={(e) => onChange({...speaker, biographie: e.target.value})}
            placeholder="Biographie de l'intervenant"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={speaker.email || ''}
            onChange={(e) => onChange({...speaker, email: e.target.value})}
            placeholder="email@intervenant.com"
          />
        </div>
        
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            value={speaker.telephone || ''}
            onChange={(e) => onChange({...speaker, telephone: e.target.value})}
            placeholder="+212 5 22 XX XX XX"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={onSubmit} className="flex-1">
            {title.includes('Ajouter') ? 'Ajouter' : 'Modifier'}
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Annuler
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Intervenants</h2>
          <p className="text-muted-foreground">Gérez les intervenants de votre événement</p>
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
            onChange={setNewSpeaker}
            onSubmit={handleAddSpeaker}
            onCancel={() => setIsAddingSpeaker(false)}
            title="Ajouter un Nouvel Intervenant"
          />
        </Dialog>
      </div>

      {/* Statistics Card */}
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

      {/* Speakers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Intervenants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {speakers.map((speaker) => (
                <TableRow key={speaker.id}>
                  <TableCell className="font-medium">{speaker.nom}</TableCell>
                  <TableCell>{speaker.specialite}</TableCell>
                  <TableCell>{speaker.entreprise}</TableCell>
                  <TableCell>{speaker.email}</TableCell>
                  <TableCell>{speaker.telephone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingSpeaker(speaker)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {editingSpeaker && (
                          <SpeakerForm
                            speaker={editingSpeaker}
                            onChange={(updatedSpeaker) => setEditingSpeaker({...editingSpeaker, ...updatedSpeaker})}
                            onSubmit={handleEditSpeaker}
                            onCancel={() => setEditingSpeaker(null)}
                            title="Modifier l'Intervenant"
                          />
                        )}
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteSpeaker(speaker.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakerManagement;
