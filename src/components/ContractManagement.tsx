
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, FileText, DollarSign } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Contract {
  id: string;
  montant: number;
  type: 'SILVER' | 'GOLD' | 'DIAMOND';
  date: string;
  partnerName?: string;
}

const ContractManagement: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([
    { id: 'CT001', montant: 5000, type: 'SILVER', date: '2024-01-15', partnerName: 'TechCorp' },
    { id: 'CT002', montant: 15000, type: 'GOLD', date: '2024-02-20', partnerName: 'InnovaSoft' },
    { id: 'CT003', montant: 30000, type: 'DIAMOND', date: '2024-03-10', partnerName: 'MegaEnterprise' },
  ]);

  const [isAddingContract, setIsAddingContract] = useState(false);
  const [newContract, setNewContract] = useState<Partial<Contract>>({
    type: 'SILVER',
    date: new Date().toISOString().split('T')[0]
  });

  const contractTypes = {
    SILVER: { color: 'bg-gray-100 text-gray-800', baseAmount: 5000 },
    GOLD: { color: 'bg-yellow-100 text-yellow-800', baseAmount: 15000 },
    DIAMOND: { color: 'bg-blue-100 text-blue-800', baseAmount: 30000 }
  };

  const handleAddContract = () => {
    if (newContract.id && newContract.montant && newContract.type) {
      setContracts([...contracts, {
        ...newContract,
        id: newContract.id,
        montant: newContract.montant,
        type: newContract.type,
        date: newContract.date || new Date().toISOString().split('T')[0]
      } as Contract]);
      setNewContract({ type: 'SILVER', date: new Date().toISOString().split('T')[0] });
      setIsAddingContract(false);
    }
  };

  const handleDeleteContract = (id: string) => {
    setContracts(contracts.filter(contract => contract.id !== id));
  };

  const totalRevenue = contracts.reduce((sum, contract) => sum + contract.montant, 0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Contrats</h2>
          <p className="text-muted-foreground">Gérez les contrats de partenariat pour vos événements</p>
        </div>
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
                <Label htmlFor="contractId">ID du Contrat</Label>
                <Input
                  id="contractId"
                  value={newContract.id || ''}
                  onChange={(e) => setNewContract({...newContract, id: e.target.value})}
                  placeholder="CT004"
                />
              </div>
              <div>
                <Label htmlFor="contractType">Type de Contrat</Label>
                <Select value={newContract.type} onValueChange={(value: 'SILVER' | 'GOLD' | 'DIAMOND') => 
                  setNewContract({...newContract, type: value, montant: contractTypes[value].baseAmount})
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SILVER">Silver - 5,000€</SelectItem>
                    <SelectItem value="GOLD">Gold - 15,000€</SelectItem>
                    <SelectItem value="DIAMOND">Diamond - 30,000€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contractAmount">Montant (€)</Label>
                <Input
                  id="contractAmount"
                  type="number"
                  value={newContract.montant || ''}
                  onChange={(e) => setNewContract({...newContract, montant: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="contractDate">Date du Contrat</Label>
                <Input
                  id="contractDate"
                  type="date"
                  value={newContract.date || ''}
                  onChange={(e) => setNewContract({...newContract, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="partnerName">Nom du Partenaire</Label>
                <Input
                  id="partnerName"
                  value={newContract.partnerName || ''}
                  onChange={(e) => setNewContract({...newContract, partnerName: e.target.value})}
                  placeholder="Nom de l'entreprise"
                />
              </div>
              <Button onClick={handleAddContract} className="w-full">
                Créer le Contrat
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-emi-gold" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Revenus Totaux</p>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()}€</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <TableHead>ID Contrat</TableHead>
                <TableHead>Partenaire</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.partnerName || 'Non assigné'}</TableCell>
                  <TableCell>
                    <Badge className={contractTypes[contract.type].color}>
                      {contract.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{contract.montant.toLocaleString()}€</TableCell>
                  <TableCell>{new Date(contract.date).toLocaleDateString('fr-FR')}</TableCell>
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
