
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Building, Eye } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import CompanyForm from './CompanyForm';

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
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({});

  const handleAddCompany = (companyData: Partial<Company>) => {
    if (!companyData.nom || !companyData.secteur || !companyData.email) return;

    const company: Company = {
      id: Date.now().toString(),
      nom: companyData.nom,
      secteur: companyData.secteur,
      description: companyData.description || '',
      email: companyData.email,
      telephone: companyData.telephone || '',
      siteWeb: companyData.siteWeb || ''
    };

    addCompany(company);
    setNewCompany({});
    setIsAddingCompany(false);
  };

  const handleEditCompany = (companyData: Partial<Company>) => {
    if (!editingCompany || !companyData.nom || !companyData.secteur || !companyData.email) return;

    const updatedCompany = { ...editingCompany, ...companyData };
    updateCompany(updatedCompany);
    setEditingCompany(null);
  };

  const handleDeleteCompany = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      deleteCompany(id);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Entreprises</h2>
          <p className="text-muted-foreground">
            {isAdmin ? 'Gérez les entreprises participantes au forum' : 'Consultez les entreprises participantes au forum'}
          </p>
        </div>
        {isAdmin && (
          <Dialog open={isAddingCompany} onOpenChange={setIsAddingCompany}>
            <DialogTrigger asChild>
              <Button className="bg-emi-blue hover:bg-emi-darkblue">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Entreprise
              </Button>
            </DialogTrigger>
            <CompanyForm
              company={newCompany}
              onSubmit={handleAddCompany}
              onCancel={() => setIsAddingCompany(false)}
              title="Ajouter une Nouvelle Entreprise"
            />
          </Dialog>
        )}
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
                            onClick={() => setViewingCompany(company)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {viewingCompany && (
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails de l'Entreprise</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <strong>Nom:</strong> {viewingCompany.nom}
                              </div>
                              <div>
                                <strong>Secteur:</strong> {viewingCompany.secteur}
                              </div>
                              <div>
                                <strong>Description:</strong> {viewingCompany.description}
                              </div>
                              <div>
                                <strong>Email:</strong> {viewingCompany.email}
                              </div>
                              <div>
                                <strong>Téléphone:</strong> {viewingCompany.telephone}
                              </div>
                              <div>
                                <strong>Site web:</strong> {viewingCompany.siteWeb}
                              </div>
                              <Button onClick={() => setViewingCompany(null)} className="w-full">
                                Fermer
                              </Button>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                      
                      {isAdmin && (
                        <>
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
                        </>
                      )}
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
