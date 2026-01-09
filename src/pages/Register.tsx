import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const [searchParams] = useSearchParams();
  const trainerId = searchParams.get('ref');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'trainer' | 'student'>(trainerId ? 'student' : 'trainer');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUp(email, password, fullName, role, trainerId || undefined);

    if (error) {
      toast.error('Erro ao criar conta', {
        description: error.message || 'Tente novamente mais tarde.',
      });
    } else {
      toast.success('Conta criada com sucesso!', {
        description: 'Você já pode fazer login.',
      });
      
      // If student, redirect to anamnesis after login
      if (role === 'student') {
        navigate('/aluno/anamnese');
      } else {
        navigate('/trainer');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Criar sua conta</CardTitle>
          <CardDescription>
            {trainerId 
              ? 'Você foi convidado por um instrutor. Complete seu cadastro abaixo.'
              : 'Preencha os dados abaixo para começar'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            {!trainerId && (
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de conta</Label>
                <Select value={role} onValueChange={(v) => setRole(v as 'trainer' | 'student')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer">Personal Trainer</SelectItem>
                    <SelectItem value="student">Aluno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {trainerId && (
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                ✓ Você será vinculado automaticamente ao seu instrutor
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Fazer login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
