import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Building, MapPin, Users, Edit, Trash2, Phone, Mail, Globe } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Company {
  id: string;
  nom: string;
  secteur: string;
  description: string;
  email: string;
  telephone: string;
  siteWeb: string;
  standNumero?: number;
  typeContrat?: 'SILVER' | 'GOLD' | 'DIAMOND';
  nombreEmployes: number;
  intervenants: string[];
}

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      nom: 'TechCorp Innovation',
      secteur: 'Technologies',
      description: 'Leader en solutions d\'intelligence artificielle et de machine learning.',
      email: 'contact@techcorp.com',
      telephone: '+33 1 23 45 67 89',
      siteWeb: 'www.techcorp.com',
      standNumero: 1,
      typeContrat: 'DIAMOND',
      nombreEmployes: 250,
      intervenants: ['Dr. Marie Dupont']
    },
    {
      id: '2',
      nom: 'SecureNet Solutions',
      secteur: 'Cybersécurité',
      description: 'Spécialiste en sécurité informatique et protection des données.',
      email: 'info@securenet.com',
      telephone: '+33 1 98 76 54 32',
      siteWeb: 'www.securenet.com',
      standNumero: 3,
      typeContrat: 'GOLD',
      nombreEmployes: 120,
      intervenants: ['Jean-Pierre Martin']
    }
  ]);

  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    intervenants: []
  });

  const secteurs = [
    'Technologies', 'Cybersécurité', 'Finance', 'Santé', 
    'Éducation', 'Énergie', 'Transport', 'Commerce', 'Autre'
  ];

  const contractTypes = {
    SILVER: { label: 'Silver', color: 'bg-gray-100 text-gray-800' },
    GOLD: { label: 'Gold', color: 'bg-yellow-100 text-yellow-800' },
    DIAMOND: { label: 'Diamond', color: 'bg-blue-100 text-blue-800' }
  };

  const handleAddCompany = () => {
    if (!newCompany.nom || !newCompany.secteur) return;

    const company: Company = {
      id: Date.now().toString(),
      nom: newCompany.nom,
      secteur: newCompany.secteur,
      description: newCompany.description || '',
      email: newCompany.email || '',
      telephone: newCompany.telephone || '',
      siteWeb: newCompany.siteWeb || '',
      standNumero: newCompany.standNumero,
      typeContrat: newCompany.typeContrat,
      nombreEmployes: newCompany.nombreEmployes || 0,
      intervenants: newCompany.intervenants || []
    };

    setCompanies([...companies, company]);
    setNewCompany({ intervenants: [] });
    setIsAddingCompany(false);
  };

  const handleUpdateCompany = () => {
    if (!editingCompany) return;

    setCompanies(companies.map(company => 
      company.id === editingCompany.id ? editingCompany : company
    ));
    setEditingCompany(null);
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  const handleEditingCompanyChange = (updates: Partial<Company>) => {
    if (editingCompany) {
      setEditingCompany({ ...editingCompany, ...updates });
    }
  };

  const CompanyCard = ({ company }: { company: Company }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{company.nom}</CardTitle>
            <Badge className="mt-2 bg-emi-cyan text-white">
              {company.secteur}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingCompany(company)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteCompany(company.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {company.description && (
          <p className="text-sm text-muted-foreground">
            {company.description.length > 100 
              ? `${company.description.substring(0, 100)}...` 
              : company.description
            }
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          {company.email && (
            <div className="flex items-center text-muted-foreground">
              <Mail className="w-4 h-4 mr-2" />
              <span className="truncate">{company.email}</span>
            </div>
          )}
          
          {company.telephone && (
            <div className="flex items-center text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              <span>{company.telephone}</span>
            </div>
          )}
          
          {company.siteWeb && (
            <div className="flex items-center text-muted-foreground">
              <Globe className="w-4 h-4 mr-2" />
              <span className="truncate">{company.siteWeb}</span>
            </div>
          )}
          
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>{company.nombreEmployes} employés</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {company.standNumero && (
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-1 text-emi-blue" />
              <span>Stand {company.standNumero}</span>
            </div>
          )}
          
          {company.typeContrat && (
            <Badge className={contractTypes[company.typeContrat].color}>
              {contractTypes[company.typeContrat].label}
            </Badge>
          )}
        </div>

        {company.intervenants.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Intervenants:</p>
            <div className="flex flex-wrap gap-1">
              {company.intervenants.map((intervenant, idx) => (
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

  const CompanyForm = ({ 
    company, 
    onCompanyChange, 
    onSubmit, 
    title 
  }: { 
    company: Partial<Company>, 
    onCompanyChange: (company: Partial<Company>) => void,
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
            <Label htmlFor="nom">Nom de l'entreprise</Label>
            <Input
              id="nom"
              value={company.nom || ''}
              onChange={(e) => onCompanyChange({...company, nom: e.target.value})}
              placeholder="TechCorp Innovation"
            />
          </div>
          <div>
            <Label htmlFor="secteur">Secteur</Label>
            <Select value={company.secteur} onValueChange={(value) => 
              onCompanyChange({...company, secteur: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                {secteurs.map(secteur => (
                  <SelectItem key={secteur} value={secteur}>{secteur}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={company.description || ''}
            onChange={(e) => onCompanyChange({...company, description: e.target.value})}
            placeholder="Décrivez l'entreprise et ses activités..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={company.email || ''}
              onChange={(e) => onCompanyChange({...company, email: e.target.value})}
              placeholder="contact@entreprise.com"
            />
          </div>
          <div>
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={company.telephone || ''}
              onChange={(e) => onCompanyChange({...company, telephone: e.target.value})}
              placeholder="+33 1 23 45 67 89"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="siteWeb">Site Web</Label>
            <Input
              id="siteWeb"
              value={company.siteWeb || ''}
              onChange={(e) => onCompanyChange({...company, siteWeb: e.target.value})}
              placeholder="www.entreprise.com"
            />
          </div>
          <div>
            <Label htmlFor="nombreEmployes">Nombre d'employés</Label>
            <Input
              id="nombreEmployes"
              type="number"
              value={company.nombreEmployes || ''}
              onChange={(e) => onCompanyChange({...company, nombreEmployes: Number(e.target.value)})}
              placeholder="50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="standNumero">Numéro de stand</Label>
            <Input
              id="standNumero"
              type="number"
              value={company.standNumero || ''}
              onChange={(e) => onCompanyChange({...company, standNumero: Number(e.target.value)})}
              placeholder="1"
            />
          </div>
          <div>
            <Label htmlFor="typeContrat">Type de contrat</Label>
            <Select value={company.typeContrat} onValueChange={(value: 'SILVER' | 'GOLD' | 'DIAMOND') => 
              onCompanyChange({...company, typeContrat: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SILVER">Silver</SelectItem>
                <SelectItem value="GOLD">Gold</SelectItem>
                <SelectItem value="DIAMOND">Diamond</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="intervenants">Intervenants (séparés par des virgules)</Label>
          <Input
            id="intervenants"
            value={company.intervenants?.join(', ') || ''}
            onChange={(e) => onCompanyChange({
              ...company, 
              intervenants: e.target.value.split(',').map(s => s.trim()).filter(s => s)
            })}
            placeholder="Dr. Jean Dupont, Marie Martin"
          />
        </div>

        <Button onClick={onSubmit} className="w-full">
          {title.includes('Modifier') ? 'Mettre à jour' : 'Ajouter l\'entreprise'}
        </Button>
      </div>
    </DialogContent>
  );

  const getStatistics = () => {
    const total = companies.length;
    const avecStand = companies.filter(c => c.standNumero).length;
    const avecContrat = companies.filter(c => c.typeContrat).length;
    const totalEmployes = companies.reduce((sum, c) => sum + c.nombreEmployes, 0);
    
    return { total, avecStand, avecContrat, totalEmployes };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Entreprises</h2>
          <p className="text-muted-foreground">Gérez les entreprises participantes et leurs informations</p>
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
            onCompanyChange={setNewCompany}
            onSubmit={handleAddCompany}
            title="Ajouter une Nouvelle Entreprise"
          />
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-emi-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Entreprises</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-emi-gold" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avec Stand</p>
                <p className="text-2xl font-bold">{stats.avecStand}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="text-green-600 text-2xl font-bold">€</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avec Contrat</p>
                <p className="text-2xl font-bold">{stats.avecContrat}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-emi-cyan" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Employés</p>
                <p className="text-2xl font-bold">{stats.totalEmployes.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {/* Edit Dialog */}
      {editingCompany && (
        <Dialog open={!!editingCompany} onOpenChange={() => setEditingCompany(null)}>
          <CompanyForm
            company={editingCompany}
            onCompanyChange={handleEditingCompanyChange}
            onSubmit={handleUpdateCompany}
            title="Modifier l'Entreprise"
          />
        </Dialog>
      )}
    </div>
  );
};

export default CompanyManagement;
