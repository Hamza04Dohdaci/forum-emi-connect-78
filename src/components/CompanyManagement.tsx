
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

interface Company {
  id: string;
  nom: string;
  secteur: string;
  description: string;
  email: string;
  telephone: string;
  siteWeb: string;
}

const CompanyManagement: React.FC = () => {
  const { companies, addCompany, updateCompany, deleteCompany } = useEvent();
  const { isAdmin } = useAuth();
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({});

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-emi-blue mb-4">Gestion des Entreprises</h2>
        <p className="text-muted-foreground">Vous n'avez pas les permissions pour accéder à cette section.</p>
      </div>
    );
  }

  const handleAddCompany = () => {
    if (!newCompany.nom || !newCompany.secteur || !newCompany.email) return;

    const company: Company = {
      id: Date.now().toString(),
      nom: newCompany.nom,
      secteur: newCompany.secteur,
      description: newCompany.description || '',
      email: newCompany.email,
      telephone: newCompany.telephone || '',
      siteWeb: newCompany.siteWeb || ''
    };

    addCompany(company);
    setNewCompany({});
    setIsAddingCompany(false);
  };

  const handleEditCompany = () => {
    if (!editingCompany || !editingCompany.nom || !editingCompany.secteur || !editingCompany.email) return;

    updateCompany(editingCompany);
    setEditingCompany(null);
  };

  const handleDeleteCompany = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      deleteCompany(id);
    }
  };

  const CompanyForm = ({ 
    company, 
    onChange, 
    onSubmit, 
    onCancel, 
    title 
  }: {
    company: Partial<Company>;
    onChange: (company: Partial<Company>) => void;
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
          <Label htmlFor="nom">Nom de l'entreprise *</Label>
          <Input
            id="nom"
            value={company.nom || ''}
            onChange={(e) => onChange({...company, nom: e.target.value})}
            placeholder="Nom de l'entreprise"
          />
        </div>
        
        <div>
          <Label htmlFor="secteur">Secteur d'activité *</Label>
          <Input
            id="secteur"
            value={company.secteur || ''}
            onChange={(e) => onChange({...company, secteur: e.target.value})}
            placeholder="Secteur d'activité"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={company.description || ''}
            onChange={(e) => onChange({...company, description: e.target.value})}
            placeholder="Description de l'entreprise"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={company.email || ''}
            onChange={(e) => onChange({...company, email: e.target.value})}
            placeholder="contact@entreprise.com"
          />
        </div>
        
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            value={company.telephone || ''}
            onChange={(e) => onChange({...company, telephone: e.target.value})}
            placeholder="+212 5 22 XX XX XX"
          />
        </div>
        
        <div>
          <Label htmlFor="siteWeb">Site web</Label>
          <Input
            id="siteWeb"
            value={company.siteWeb || ''}
            onChange={(e) => onChange({...company, siteWeb: e.target.value})}
            placeholder="www.entreprise.com"
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
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Entreprises</h2>
          <p className="text-muted-foreground">Gérez les entreprises participantes au forum</p>
        </div>
        <Dialog open={isAddingCompany} onOpenChange={setIsAddingCompany}>
          <DialogTrigger asChild>
            <Button className="bg-emi-blue hover:bg-emi-darkblue">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Entreprise
            </Button>
          </DialogTrigger>
          <CompanyForm
            company={newCompany}
            onChange={setNewCompany}
            onSubmit={handleAddCompany}
            onCancel={() => setIsAddingCompany(false)}
            title="Ajouter une Nouvelle Entreprise"
          />
        </Dialog>
      </div>

      {/* Statistics Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-emi-blue" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Entreprises</p>
              <p className="text-2xl font-bold">{companies.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Entreprises</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Secteur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Site web</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.nom}</TableCell>
                  <TableCell>{company.secteur}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.telephone}</TableCell>
                  <TableCell>{company.siteWeb}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingCompany(company)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {editingCompany && (
                          <CompanyForm
                            company={editingCompany}
                            onChange={(updatedCompany) => setEditingCompany({...editingCompany, ...updatedCompany})}
                            onSubmit={handleEditCompany}
                            onCancel={() => setEditingCompany(null)}
                            title="Modifier l'Entreprise"
                          />
                        )}
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteCompany(company.id)}
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

export default CompanyManagement;
