
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const validUsers = [
  { email: 'admin@forumemi.com', password: 'admin123', role: 'admin' as const },
  { email: 'hamzamantrach@forumemi.com', password: 'hamzamantrach123', role: 'user' as const },
  { email: 'alimoustadraf@forumemi.com', password: 'alimoustadraf123', role: 'user' as const },
  { email: 'mohamedgriguira@forumemi.com', password: 'mohamedgriguira123', role: 'user' as const },
  { email: 'younesnihji@forumemi.com', password: 'younesnihji123', role: 'user' as const },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const validUser = validUsers.find(u => u.email === email && u.password === password);
    if (validUser) {
      setUser({ email: validUser.email, role: validUser.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
