
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

interface Contract {
  id: string;
  partenaire: string;
  type: 'SILVER' | 'GOLD' | 'DIAMOND';
  montant: number;
  dateSignature: string;
  statut: 'SIGNE' | 'EN_NEGOCIATION' | 'EXPIRE';
}

const ContractManagement: React.FC = () => {
  const { contracts, companies, addContract, updateContract, deleteContract } = useEvent();
  const { isAdmin } = useAuth();
  const [isAddingContract, setIsAddingContract] = useState(false);
  const [newContract, setNewContract] = useState<Partial<Contract>>({
    type: 'SILVER',
    statut: 'EN_NEGOCIATION',
    dateSignature: new Date().toISOString().split('T')[0]
  });

  const contractTypes = {
    SILVER: { color: 'bg-gray-100 text-gray-800' },
    GOLD: { color: 'bg-yellow-100 text-yellow-800' },
    DIAMOND: { color: 'bg-blue-100 text-blue-800' }
  };

  const handleAddContract = () => {
    if (newContract.partenaire && newContract.montant && newContract.type) {
      const contract: Contract = {
        id: Date.now().toString(),
        partenaire: newContract.partenaire,
        type: newContract.type,
        montant: newContract.montant,
        dateSignature: newContract.dateSignature || new Date().toISOString().split('T')[0],
        statut: newContract.statut || 'EN_NEGOCIATION'
      };
      
      addContract(contract);
      setNewContract({ 
        type: 'SILVER', 
        statut: 'EN_NEGOCIATION',
        dateSignature: new Date().toISOString().split('T')[0] 
      });
      setIsAddingContract(false);
    }
  };

  const handleDeleteContract = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      deleteContract(id);
    }
  };

  const totalRevenue = contracts.reduce((sum, contract) => sum + contract.montant, 0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Contrats</h2>
          <p className="text-muted-foreground">Gérez les contrats de partenariat pour vos événements</p>
        </div>
        {isAdmin && (
          <Dialog open={isAddingContract} onOpenChange={setIsAddingContract}>
            <DialogTrigger asChild>
              <Button className="bg-emi-blue hover:bg-emi-darkblue">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Contrat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un Nouveau Contrat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="partenaire">Partenaire</Label>
                  <Select value={newContract.partenaire} onValueChange={(value) => 
                    setNewContract({...newContract, partenaire: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une entreprise" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.nom}>
                          {company.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contractType">Type de Contrat</Label>
                  <Select value={newContract.type} onValueChange={(value: 'SILVER' | 'GOLD' | 'DIAMOND') => 
                    setNewContract({...newContract, type: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SILVER">Silver</SelectItem>
                      <SelectItem value="GOLD">Gold</SelectItem>
                      <SelectItem value="DIAMOND">Diamond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contractAmount">Montant (MAD)</Label>
                  <Input
                    id="contractAmount"
                    type="number"
                    value={newContract.montant || ''}
                    onChange={(e) => setNewContract({...newContract, montant: Number(e.target.value)})}
                    placeholder="Montant en dirhams"
                  />
                </div>
                <div>
                  <Label htmlFor="contractDate">Date de signature</Label>
                  <Input
                    id="contractDate"
                    type="date"
                    value={newContract.dateSignature || ''}
                    onChange={(e) => setNewContract({...newContract, dateSignature: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddContract} className="w-full">
                  Créer le Contrat
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-emi-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Contrats</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Badge className="bg-gray-100 text-gray-800">SILVER</Badge>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Contrats Silver</p>
                <p className="text-2xl font-bold">{contracts.filter(c => c.type === 'SILVER').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Badge className="bg-yellow-100 text-yellow-800">GOLD</Badge>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Contrats Gold</p>
                <p className="text-2xl font-bold">{contracts.filter(c => c.type === 'GOLD').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800">DIAMOND</Badge>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Contrats Diamond</p>
                <p className="text-2xl font-bold">{contracts.filter(c => c.type === 'DIAMOND').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Contrats</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partenaire</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.partenaire}</TableCell>
                  <TableCell>
                    <Badge className={contractTypes[contract.type].color}>
                      {contract.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{contract.montant.toLocaleString()} MAD</TableCell>
                  <TableCell>{new Date(contract.dateSignature).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    <Badge variant={contract.statut === 'SIGNE' ? 'default' : 'secondary'}>
                      {contract.statut}
                    </Badge>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteContract(contract.id)}
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

export default ContractManagement;
