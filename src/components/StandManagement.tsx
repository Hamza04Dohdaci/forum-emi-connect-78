
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Grid3X3 } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

interface Stand {
  id: string;
  numero: number;
  zone: string;
  taille: 'SMALL' | 'MEDIUM' | 'LARGE';
  statut: 'LIBRE' | 'OCCUPE' | 'RESERVE';
  entreprise?: string;
  responsable?: string;
  prix: number;
}

const StandManagement: React.FC = () => {
  const { stands, companies, addStand, updateStand, deleteStand } = useEvent();
  const { isAdmin } = useAuth();
  const [isAddingStand, setIsAddingStand] = useState(false);
  const [editingStand, setEditingStand] = useState<Stand | null>(null);
  const [newStand, setNewStand] = useState<Partial<Stand>>({
    statut: 'LIBRE',
    taille: 'MEDIUM'
  });

  const tailleLabels = {
    SMALL: 'Petit',
    MEDIUM: 'Moyen',
    LARGE: 'Grand'
  };

  const statutLabels = {
    LIBRE: 'Libre',
    OCCUPE: 'Occupé',
    RESERVE: 'Réservé'
  };

  const statutColors = {
    LIBRE: 'bg-green-100 text-green-800',
    OCCUPE: 'bg-red-100 text-red-800',
    RESERVE: 'bg-yellow-100 text-yellow-800'
  };

  const handleAddStand = () => {
    if (!newStand.numero || !newStand.zone || !newStand.taille || !newStand.prix) return;

    const stand: Stand = {
      id: Date.now().toString(),
      numero: newStand.numero,
      zone: newStand.zone,
      taille: newStand.taille,
      statut: newStand.statut || 'LIBRE',
      entreprise: newStand.entreprise,
      responsable: newStand.responsable,
      prix: newStand.prix
    };

    addStand(stand);
    setNewStand({ statut: 'LIBRE', taille: 'MEDIUM' });
    setIsAddingStand(false);
  };

  const handleEditStand = () => {
    if (!editingStand) return;

    updateStand(editingStand);
    setEditingStand(null);
  };

  const handleDeleteStand = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stand ?')) {
      deleteStand(id);
    }
  };

  const companyOptions = companies.map(company => company.nom);

  const StandForm = ({ 
    stand, 
    onChange, 
    onSubmit, 
    onCancel, 
    title 
  }: {
    stand: Partial<Stand>;
    onChange: (stand: Partial<Stand>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    title: string;
  }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="numero">Numéro de stand *</Label>
          <Input
            id="numero"
            type="number"
            value={stand.numero || ''}
            onChange={(e) => onChange({...stand, numero: parseInt(e.target.value)})}
            placeholder="Numéro du stand"
            disabled={!isAdmin}
          />
        </div>
        
        <div>
          <Label htmlFor="zone">Zone *</Label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={stand.zone || ''}
            onChange={(e) => onChange({...stand, zone: e.target.value})}
            disabled={!isAdmin}
          >
            <option value="">Sélectionnez une zone</option>
            <option value="A">Zone A</option>
            <option value="B">Zone B</option>
            <option value="C">Zone C</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="taille">Taille *</Label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={stand.taille || 'MEDIUM'}
            onChange={(e) => onChange({...stand, taille: e.target.value as Stand['taille']})}
            disabled={!isAdmin}
          >
            <option value="SMALL">Petit</option>
            <option value="MEDIUM">Moyen</option>
            <option value="LARGE">Grand</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="prix">Prix (MAD) *</Label>
          <Input
            id="prix"
            type="number"
            value={stand.prix || ''}
            onChange={(e) => onChange({...stand, prix: parseInt(e.target.value)})}
            placeholder="Prix en dirhams"
            disabled={!isAdmin}
          />
        </div>
        
        <div>
          <Label htmlFor="statut">Statut</Label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={stand.statut || 'LIBRE'}
            onChange={(e) => onChange({...stand, statut: e.target.value as Stand['statut']})}
            disabled={!isAdmin}
          >
            <option value="LIBRE">Libre</option>
            <option value="OCCUPE">Occupé</option>
            <option value="RESERVE">Réservé</option>
          </select>
        </div>
        
        {(stand.statut === 'OCCUPE' || stand.statut === 'RESERVE') && (
          <>
            <div>
              <Label htmlFor="entreprise">Entreprise</Label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={stand.entreprise || ''}
                onChange={(e) => onChange({...stand, entreprise: e.target.value})}
                disabled={!isAdmin}
              >
                <option value="">Sélectionnez une entreprise</option>
                {companyOptions.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="responsable">Responsable</Label>
              <Input
                id="responsable"
                value={stand.responsable || ''}
                onChange={(e) => onChange({...stand, responsable: e.target.value})}
                placeholder="Nom du responsable"
                disabled={!isAdmin}
              />
            </div>
          </>
        )}
        
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

  const occupiedStands = stands.filter(stand => stand.statut === 'OCCUPE').length;
  const freeStands = stands.filter(stand => stand.statut === 'LIBRE').length;
  const reservedStands = stands.filter(stand => stand.statut === 'RESERVE').length;

  // Group stands by zone
  const standsByZone = stands.reduce((acc, stand) => {
    if (!acc[stand.zone]) {
      acc[stand.zone] = [];
    }
    acc[stand.zone].push(stand);
    return acc;
  }, {} as Record<string, Stand[]>);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Stands</h2>
          <p className="text-muted-foreground">Gérez l'allocation et l'occupation des stands</p>
        </div>
        {isAdmin && (
          <Dialog open={isAddingStand} onOpenChange={setIsAddingStand}>
            <DialogTrigger asChild>
              <Button className="bg-emi-blue hover:bg-emi-darkblue">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Stand
              </Button>
            </DialogTrigger>
            <StandForm
              stand={newStand}
              onChange={setNewStand}
              onSubmit={handleAddStand}
              onCancel={() => setIsAddingStand(false)}
              title="Ajouter un Nouveau Stand"
            />
          </Dialog>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Grid3X3 className="h-8 w-8 text-emi-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Stands</p>
                <p className="text-2xl font-bold">{stands.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Grid3X3 className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Occupés</p>
                <p className="text-2xl font-bold">{occupiedStands}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Grid3X3 className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Réservés</p>
                <p className="text-2xl font-bold">{reservedStands}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Grid3X3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Libres</p>
                <p className="text-2xl font-bold">{freeStands}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stands by Zone */}
      {Object.keys(standsByZone).sort().map(zone => (
        <Card key={zone}>
          <CardHeader>
            <CardTitle>Zone {zone} ({standsByZone[zone].length} stands)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N°</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Prix (MAD)</TableHead>
                  {isAdmin && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {standsByZone[zone]
                  .sort((a, b) => a.numero - b.numero)
                  .map((stand) => (
                    <TableRow key={stand.id}>
                      <TableCell className="font-medium">{stand.numero}</TableCell>
                      <TableCell>{tailleLabels[stand.taille]}</TableCell>
                      <TableCell>
                        <Badge className={statutColors[stand.statut]}>
                          {statutLabels[stand.statut]}
                        </Badge>
                      </TableCell>
                      <TableCell>{stand.entreprise || '-'}</TableCell>
                      <TableCell>{stand.responsable || '-'}</TableCell>
                      <TableCell>{stand.prix.toLocaleString()} MAD</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingStand(stand)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              {editingStand && (
                                <StandForm
                                  stand={editingStand}
                                  onChange={(updatedStand) => setEditingStand({...editingStand, ...updatedStand})}
                                  onSubmit={handleEditStand}
                                  onCancel={() => setEditingStand(null)}
                                  title="Modifier le Stand"
                                />
                              )}
                            </Dialog>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteStand(stand.id)}
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
      ))}
    </div>
  );
};

export default StandManagement;
