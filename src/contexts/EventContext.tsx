
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Company {
  id: string;
  nom: string;
  secteur: string;
  description: string;
  email: string;
  telephone: string;
  siteWeb: string;
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
}

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

interface Conference {
  id: string;
  titre: string;
  description: string;
  dateHeure: string;
  duree: number;
  salle: string;
  intervenants: string[];
  entreprise: string;
}

interface Task {
  id: string;
  description: string;
  statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINEE';
  dateLimite: string;
  responsable: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface EventContextType {
  companies: Company[];
  contracts: Contract[];
  speakers: Speaker[];
  stands: Stand[];
  conferences: Conference[];
  tasks: Task[];
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
  addConference: (conference: Conference) => void;
  updateConference: (conference: Conference) => void;
  deleteConference: (id: string) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

// Helper functions for localStorage persistence
const loadFromStorage = <T,>(key: string, defaultValue: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(() => 
    loadFromStorage('companies', [
      {
        id: '1',
        nom: 'TechCorp Innovation',
        secteur: 'Technologies',
        description: 'Leader en solutions d\'intelligence artificielle et de machine learning.',
        email: 'contact@techcorp.com',
        telephone: '+212 5 22 34 56 78',
        siteWeb: 'www.techcorp.com'
      },
      {
        id: '2',
        nom: 'SecureNet Solutions',
        secteur: 'Cybersécurité',
        description: 'Spécialiste en sécurité informatique et protection des données.',
        email: 'info@securenet.com',
        telephone: '+212 5 22 98 76 54',
        siteWeb: 'www.securenet.com'
      }
    ])
  );

  const [contracts, setContracts] = useState<Contract[]>(() =>
    loadFromStorage('contracts', [
      {
        id: '1',
        partenaire: 'TechCorp Innovation',
        type: 'DIAMOND',
        montant: 50000,
        dateSignature: new Date().toISOString().split('T')[0],
        statut: 'SIGNE'
      },
      {
        id: '2',
        partenaire: 'SecureNet Solutions',
        type: 'GOLD',
        montant: 25000,
        dateSignature: new Date().toISOString().split('T')[0],
        statut: 'SIGNE'
      }
    ])
  );

  const [speakers, setSpeakers] = useState<Speaker[]>(() =>
    loadFromStorage('speakers', [
      {
        id: '1',
        nom: 'Dr. Marie Dupont',
        biographie: 'Docteure en Intelligence Artificielle avec 15 ans d\'expérience.',
        specialite: 'Intelligence Artificielle',
        entreprise: 'TechCorp Innovation',
        email: 'marie.dupont@techcorp.com',
        telephone: '+212 5 22 34 56 78'
      },
      {
        id: '2',
        nom: 'Jean-Pierre Martin',
        biographie: 'Expert en cybersécurité et consultant international.',
        specialite: 'Cybersécurité',
        entreprise: 'SecureNet Solutions',
        email: 'jp.martin@securenet.com',
        telephone: '+212 5 22 98 76 54'
      }
    ])
  );

  const [stands, setStands] = useState<Stand[]>(() =>
    loadFromStorage('stands', [
      { id: '1', numero: 1, zone: 'A', taille: 'LARGE', statut: 'OCCUPE', entreprise: 'TechCorp Innovation', responsable: 'Dr. Marie Dupont', prix: 5000 },
      { id: '2', numero: 2, zone: 'A', taille: 'MEDIUM', statut: 'LIBRE', prix: 3000 },
      { id: '3', numero: 3, zone: 'B', taille: 'MEDIUM', statut: 'OCCUPE', entreprise: 'SecureNet Solutions', responsable: 'Jean-Pierre Martin', prix: 3000 },
      { id: '4', numero: 4, zone: 'B', taille: 'SMALL', statut: 'LIBRE', prix: 2000 }
    ])
  );

  const [conferences, setConferences] = useState<Conference[]>(() =>
    loadFromStorage('conferences', [
      {
        id: '1',
        titre: 'Innovation et IA',
        description: 'Les dernières avancées en intelligence artificielle',
        dateHeure: '2024-06-15T10:00',
        duree: 90,
        salle: 'Salle polyvalente (480 personnes)',
        intervenants: ['Dr. Marie Dupont'],
        entreprise: 'TechCorp Innovation'
      },
      {
        id: '2',
        titre: 'Cybersécurité moderne',
        description: 'Les défis de la sécurité informatique aujourd\'hui',
        dateHeure: '2024-06-15T14:00',
        duree: 60,
        salle: 'Grand amphi (220 personnes)',
        intervenants: ['Jean-Pierre Martin'],
        entreprise: 'SecureNet Solutions'
      }
    ])
  );

  const [tasks, setTasks] = useState<Task[]>(() =>
    loadFromStorage('tasks', [
      {
        id: '1',
        description: 'Préparer les badges pour les participants',
        statut: 'EN_ATTENTE',
        dateLimite: '2024-06-15',
        responsable: 'Marie Dupont',
        priority: 'HIGH'
      },
      {
        id: '2',
        description: 'Installer le matériel audiovisuel',
        statut: 'EN_COURS',
        dateLimite: '2024-06-12',
        responsable: 'Jean Martin',
        priority: 'MEDIUM'
      }
    ])
  );

  // Persist data to localStorage whenever state changes
  useEffect(() => saveToStorage('companies', companies), [companies]);
  useEffect(() => saveToStorage('contracts', contracts), [contracts]);
  useEffect(() => saveToStorage('speakers', speakers), [speakers]);
  useEffect(() => saveToStorage('stands', stands), [stands]);
  useEffect(() => saveToStorage('conferences', conferences), [conferences]);
  useEffect(() => saveToStorage('tasks', tasks), [tasks]);

  // Companies CRUD
  const addCompany = (company: Company) => {
    setCompanies(prev => [...prev, company]);
  };

  const updateCompany = (company: Company) => {
    setCompanies(prev => prev.map(c => c.id === company.id ? company : c));
  };

  const deleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  // Contracts CRUD
  const addContract = (contract: Contract) => {
    const newContract = { ...contract, statut: 'SIGNE' as const };
    setContracts(prev => [...prev, newContract]);
  };

  const updateContract = (contract: Contract) => {
    setContracts(prev => prev.map(c => c.id === contract.id ? contract : c));
  };

  const deleteContract = (id: string) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  // Speakers CRUD
  const addSpeaker = (speaker: Speaker) => {
    setSpeakers(prev => [...prev, speaker]);
  };

  const updateSpeaker = (speaker: Speaker) => {
    setSpeakers(prev => prev.map(s => s.id === speaker.id ? speaker : s));
  };

  const deleteSpeaker = (id: string) => {
    setSpeakers(prev => prev.filter(s => s.id !== id));
  };

  // Stands CRUD
  const addStand = (stand: Stand) => {
    setStands(prev => [...prev, stand]);
  };

  const updateStand = (stand: Stand) => {
    setStands(prev => prev.map(s => s.id === stand.id ? stand : s));
  };

  const deleteStand = (id: string) => {
    setStands(prev => prev.filter(s => s.id !== id));
  };

  // Conferences CRUD
  const addConference = (conference: Conference) => {
    setConferences(prev => [...prev, conference]);
  };

  const updateConference = (conference: Conference) => {
    setConferences(prev => prev.map(c => c.id === conference.id ? conference : c));
  };

  const deleteConference = (id: string) => {
    setConferences(prev => prev.filter(c => c.id !== id));
  };

  // Tasks CRUD
  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (task: Task) => {
    setTasks(prev => prev.map(t => t.id === task.id ? task : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <EventContext.Provider value={{
      companies,
      contracts,
      speakers,
      stands,
      conferences,
      tasks,
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
      deleteStand,
      addConference,
      updateConference,
      deleteConference,
      addTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </EventContext.Provider>
  );
};
