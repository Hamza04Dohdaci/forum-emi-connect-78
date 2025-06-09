
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, LogIn, Building, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const loginSuccess = login(formData.email, formData.motDePasse);
    
    if (loginSuccess) {
      setSuccess('Connexion réussie ! Redirection...');
      setTimeout(() => {
        navigate('/management');
      }, 1000);
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emi-blue to-emi-cyan flex items-center justify-center p-6">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Left side - Branding */}
        <div className="hidden lg:block flex-1 text-white">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold">Forum EMI</h1>
            <p className="text-xl opacity-90">
              Plateforme de gestion de Forum EMI 2026
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6" />
                <span>Gestion des partenaires et contrats</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <span>Organisation de conférences</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <span>Management d'équipe logistique</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Connexion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="motDePasse">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="motDePasse"
                      name="motDePasse"
                      type="password"
                      value={formData.motDePasse}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-emi-blue hover:bg-emi-darkblue">
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
