
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface Contract {
  id: string;
  partenaire: string;
  type: 'SILVER' | 'GOLD' | 'DIAMOND';
  montant: number;
  dateSignature: string;
  statut: 'SIGNE' | 'EN_NEGOCIATION' | 'EXPIRE';
}

interface Speaker {
  id: string;
  nom: string;
  biographie: string;
  specialite: string;
  entreprise: string;
  email: string;
  telephone: string;
  conferences: string[];
}

interface Stand {
  id: string;
  numero: number;
  zone: string;
  taille: 'SMALL' | 'MEDIUM' | 'LARGE';
  statut: 'LIBRE' | 'OCCUPE' | 'RESERVE';
  entreprise?: string;
  prix: number;
}

interface EventContextType {
  companies: Company[];
  contracts: Contract[];
  speakers: Speaker[];
  stands: Stand[];
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addContract: (contract: Contract) => void;
  updateContract: (contract: Contract) => void;
  deleteContract: (id: string) => void;
  addSpeaker: (speaker: Speaker) => void;
  updateSpeaker: (speaker: Speaker) => void;
  deleteSpeaker: (id: string) => void;
  addStand: (stand: Stand) => void;
  updateStand: (stand: Stand) => void;
  deleteStand: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      partenaire: 'TechCorp Innovation',
      type: 'DIAMOND',
      montant: 50000,
      dateSignature: '2024-01-15',
      statut: 'SIGNE'
    },
    {
      id: '2',
      partenaire: 'SecureNet Solutions',
      type: 'GOLD',
      montant: 25000,
      dateSignature: '2024-02-10',
      statut: 'SIGNE'
    }
  ]);

  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: '1',
      nom: 'Dr. Marie Dupont',
      biographie: 'Docteure en Intelligence Artificielle avec 15 ans d\'expérience dans le domaine de la recherche et du développement.',
      specialite: 'Intelligence Artificielle',
      entreprise: 'TechCorp Innovation',
      email: 'marie.dupont@techcorp.com',
      telephone: '+33 1 23 45 67 89',
      conferences: ['Innovation et IA', 'L\'avenir de l\'IA']
    },
    {
      id: '2',
      nom: 'Jean-Pierre Martin',
      biographie: 'Expert en cybersécurité et consultant pour de grandes entreprises internationales.',
      specialite: 'Cybersécurité',
      entreprise: 'SecureNet Solutions',
      email: 'jp.martin@securenet.com',
      telephone: '+33 1 98 76 54 32',
      conferences: ['Cybersécurité moderne']
    }
  ]);

  const [stands, setStands] = useState<Stand[]>([
    { id: '1', numero: 1, zone: 'A', taille: 'LARGE', statut: 'OCCUPE', entreprise: 'TechCorp Innovation', prix: 5000 },
    { id: '2', numero: 2, zone: 'A', taille: 'MEDIUM', statut: 'LIBRE', prix: 3000 },
    { id: '3', numero: 3, zone: 'B', taille: 'MEDIUM', statut: 'OCCUPE', entreprise: 'SecureNet Solutions', prix: 3000 },
    { id: '4', numero: 4, zone: 'B', taille: 'SMALL', statut: 'LIBRE', prix: 2000 }
  ]);

  const addCompany = (company: Company) => {
    setCompanies(prev => [...prev, company]);
  };

  const updateCompany = (company: Company) => {
    setCompanies(prev => prev.map(c => c.id === company.id ? company : c));
  };

  const deleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
  };

  const updateContract = (contract: Contract) => {
    setContracts(prev => prev.map(c => c.id === contract.id ? contract : c));
  };

  const deleteContract = (id: string) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  const addSpeaker = (speaker: Speaker) => {
    setSpeakers(prev => [...prev, speaker]);
  };

  const updateSpeaker = (speaker: Speaker) => {
    setSpeakers(prev => prev.map(s => s.id === speaker.id ? speaker : s));
  };

  const deleteSpeaker = (id: string) => {
    setSpeakers(prev => prev.filter(s => s.id !== id));
  };

  const addStand = (stand: Stand) => {
    setStands(prev => [...prev, stand]);
  };

  const updateStand = (stand: Stand) => {
    setStands(prev => prev.map(s => s.id === stand.id ? stand : s));
  };

  const deleteStand = (id: string) => {
    setStands(prev => prev.filter(s => s.id !== id));
  };

  return (
    <EventContext.Provider value={{
      companies,
      contracts,
      speakers,
      stands,
      addCompany,
      updateCompany,
      deleteCompany,
      addContract,
      updateContract,
      deleteContract,
      addSpeaker,
      updateSpeaker,
      deleteSpeaker,
      addStand,
      updateStand,
      deleteStand
    }}>
      {children}
    </EventContext.Provider>
  );
};
