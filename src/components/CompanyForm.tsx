
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Company {
  id: string;
  nom: string;
  secteur: string;
  description: string;
  email: string;
  telephone: string;
  siteWeb: string;
}

interface CompanyFormProps {
  company: Partial<Company>;
  onSubmit: (company: Partial<Company>) => void;
  onCancel: () => void;
  title: string;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ 
  company: initialCompany, 
  onSubmit, 
  onCancel, 
  title 
}) => {
  const [formData, setFormData] = useState<Partial<Company>>(initialCompany);

  const handleInputChange = useCallback((field: keyof Company, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <Label htmlFor="nom">Nom de l'entreprise *</Label>
          <Input
            id="nom"
            value={formData.nom || ''}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            placeholder="Nom de l'entreprise"
          />
        </div>
        
        <div>
          <Label htmlFor="secteur">Secteur d'activité *</Label>
          <Input
            id="secteur"
            value={formData.secteur || ''}
            onChange={(e) => handleInputChange('secteur', e.target.value)}
            placeholder="Secteur d'activité"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Description de l'entreprise"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="contact@entreprise.com"
          />
        </div>
        
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            value={formData.telephone || ''}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            placeholder="+212 5 22 XX XX XX"
          />
        </div>
        
        <div>
          <Label htmlFor="siteWeb">Site web</Label>
          <Input
            id="siteWeb"
            value={formData.siteWeb || ''}
            onChange={(e) => handleInputChange('siteWeb', e.target.value)}
            placeholder="www.entreprise.com"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleSubmit} className="flex-1">
            {title.includes('Ajouter') ? 'Ajouter' : 'Modifier'}
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Annuler
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default CompanyForm;
