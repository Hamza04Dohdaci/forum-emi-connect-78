
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Building, MapPin, Users, Edit, Trash2, Grid3X3 } from 'lucide-react';

interface Stand {
  numero: number;
  entreprise?: string;
  statut: 'LIBRE' | 'OCCUPE' | 'RESERVE';
  taille: 'SMALL' | 'MEDIUM' | 'LARGE';
  zone: string;
}

const StandManagement: React.FC = () => {
  const [stands, setStands] = useState<Stand[]>([
    { numero: 1, entreprise: 'TechCorp Innovation', statut: 'OCCUPE', taille: 'LARGE', zone: 'Zone A' },
    { numero: 2, statut: 'LIBRE', taille: 'MEDIUM', zone: 'Zone A' },
    { numero: 3, entreprise: 'SecureNet Solutions', statut: 'OCCUPE', taille: 'SMALL', zone: 'Zone A' },
    { numero: 4, statut: 'RESERVE', taille: 'MEDIUM', zone: 'Zone B' },
    { numero: 5, statut: 'LIBRE', taille: 'LARGE', zone: 'Zone B' },
    { numero: 6, entreprise: 'InnovaSoft', statut: 'OCCUPE', taille: 'MEDIUM', zone: 'Zone B' },
    { numero: 7, statut: 'LIBRE', taille: 'SMALL', zone: 'Zone C' },
    { numero: 8, statut: 'LIBRE', taille: 'SMALL', zone: 'Zone C' },
  ]);

  const [isAllocating, setIsAllocating] = useState(false);
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
  const [allocation, setAllocation] = useState({
    entreprise: '',
    statut: 'RESERVE' as Stand['statut']
  });

  const zones = ['Zone A', 'Zone B', 'Zone C'];
  const tailles = {
    SMALL: { label: 'Petit', color: 'bg-yellow-100 text-yellow-800' },
    MEDIUM: { label: 'Moyen', color: 'bg-blue-100 text-blue-800' },
    LARGE: { label: 'Grand', color: 'bg-green-100 text-green-800' }
  };

  const statuts = {
    LIBRE: { label: 'Libre', color: 'bg-green-100 text-green-800 border-green-200' },
    OCCUPE: { label: 'Occupé', color: 'bg-red-100 text-red-800 border-red-200' },
    RESERVE: { label: 'Réservé', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  };

  const handleAllocateStand = () => {
    if (!selectedStand || !allocation.entreprise) return;

    setStands(stands.map(stand => 
      stand.numero === selectedStand.numero 
        ? { ...stand, entreprise: allocation.entreprise, statut: allocation.statut }
        : stand
    ));

    setSelectedStand(null);
    setAllocation({ entreprise: '', statut: 'RESERVE' });
    setIsAllocating(false);
  };

  const handleFreeStand = (numero: number) => {
    setStands(stands.map(stand => 
      stand.numero === numero 
        ? { ...stand, entreprise: undefined, statut: 'LIBRE' as Stand['statut'] }
        : stand
    ));
  };

  const getStandsByZone = (zone: string) => {
    return stands.filter(stand => stand.zone === zone);
  };

  const getStatistics = () => {
    const total = stands.length;
    const libres = stands.filter(s => s.statut === 'LIBRE').length;
    const occupes = stands.filter(s => s.statut === 'OCCUPE').length;
    const reserves = stands.filter(s => s.statut === 'RESERVE').length;
    
    return { total, libres, occupes, reserves };
  };

  const stats = getStatistics();

  const StandCard = ({ stand }: { stand: Stand }) => (
    <Card className={`hover:shadow-md transition-all cursor-pointer border-2 ${
      stand.statut === 'LIBRE' ? 'hover:border-green-300' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-emi-blue" />
            <span className="font-bold text-lg">Stand {stand.numero}</span>
          </div>
          <Badge className={statuts[stand.statut].color}>
            {statuts[stand.statut].label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {stand.zone}
          </div>
          
          <div className="flex items-center justify-between">
            <Badge className={tailles[stand.taille].color}>
              {tailles[stand.taille].label}
            </Badge>
          </div>

          {stand.entreprise && (
            <div className="flex items-center text-sm">
              <Building className="w-4 h-4 mr-2 text-emi-blue" />
              <span className="font-medium">{stand.entreprise}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          {stand.statut === 'LIBRE' && (
            <Button 
              size="sm" 
              onClick={() => {
                setSelectedStand(stand);
                setIsAllocating(true);
              }}
              className="flex-1"
            >
              Allouer
            </Button>
          )}
          {stand.statut !== 'LIBRE' && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleFreeStand(stand.numero)}
              className="flex-1"
            >
              Libérer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Stands</h2>
          <p className="text-muted-foreground">Allocation et gestion des espaces d'exposition</p>
        </div>
        
        <Dialog open={isAllocating} onOpenChange={setIsAllocating}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Allouer le Stand {selectedStand?.numero}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="entreprise">Entreprise</Label>
                <Input
                  id="entreprise"
                  value={allocation.entreprise}
                  onChange={(e) => setAllocation({...allocation, entreprise: e.target.value})}
                  placeholder="Nom de l'entreprise"
                />
              </div>
              
              <div>
                <Label htmlFor="statut">Statut</Label>
                <Select 
                  value={allocation.statut} 
                  onValueChange={(value: Stand['statut']) => 
                    setAllocation({...allocation, statut: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RESERVE">Réservé</SelectItem>
                    <SelectItem value="OCCUPE">Occupé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedStand && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Détails du stand:</h4>
                  <p className="text-sm text-muted-foreground">Zone: {selectedStand.zone}</p>
                  <p className="text-sm text-muted-foreground">
                    Taille: {tailles[selectedStand.taille].label}
                  </p>
                </div>
              )}
              
              <Button onClick={handleAllocateStand} className="w-full">
                Confirmer l'allocation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Grid3X3 className="h-8 w-8 text-emi-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Stands</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Libres</p>
                <p className="text-2xl font-bold text-green-600">{stats.libres}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Occupés</p>
                <p className="text-2xl font-bold text-red-600">{stats.occupes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Réservés</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.reserves}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stands by Zone */}
      {zones.map(zone => (
        <div key={zone} className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold">{zone}</h3>
            <Badge variant="outline">
              {getStandsByZone(zone).length} stands
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getStandsByZone(zone).map(stand => (
              <StandCard key={stand.numero} stand={stand} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StandManagement;
