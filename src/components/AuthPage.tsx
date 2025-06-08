
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Lock, UserPlus, LogIn, Building, Users, Calendar } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin && formData.motDePasse !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (isLogin) {
      // Simulate login
      if (formData.email === 'admin@forumemi.com' && formData.motDePasse === 'admin123') {
        setSuccess('Connexion réussie ! Redirection...');
        setTimeout(() => {
          window.location.hash = '#management';
        }, 1500);
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } else {
      // Simulate registration
      setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      setIsLogin(true);
      setFormData({ nom: '', prenom: '', email: '', motDePasse: '', confirmPassword: '' });
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
              Plateforme de gestion d'événements professionnels
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

            <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">Compte de démonstration</h3>
              <p className="text-sm opacity-90">Email: admin@forumemi.com</p>
              <p className="text-sm opacity-90">Mot de passe: admin123</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {isLogin ? 'Connexion' : 'Créer un compte'}
              </CardTitle>
              <Badge variant="outline" className="mx-auto">
                Équipe Logistique
              </Badge>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <Label htmlFor="nom">Nom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="prenom">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                          placeholder="Votre prénom"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

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

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

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
                  {isLogin ? (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Se connecter
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Créer le compte
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-sm text-emi-blue hover:underline"
                  >
                    {isLogin 
                      ? "Pas encore de compte ? S'inscrire" 
                      : "Déjà un compte ? Se connecter"
                    }
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
