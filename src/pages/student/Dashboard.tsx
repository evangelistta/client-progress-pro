import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useStudentData } from '@/hooks/useStudentData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Apple, TrendingUp, LogOut } from 'lucide-react';
import { useEffect } from 'react';

export default function StudentDashboard() {
  const { signOut } = useAuth();
  const { studentRecord, needsAnamnesis } = useStudentData();
  const navigate = useNavigate();

  useEffect(() => {
    if (needsAnamnesis) navigate('/aluno/anamnese');
  }, [needsAnamnesis, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Olá, {studentRecord?.full_name}</h1>
          <Button variant="ghost" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 grid gap-4">
        <Link to="/aluno/treinos"><Card className="hover:border-primary"><CardContent className="flex items-center gap-4 p-6"><Dumbbell className="h-8 w-8 text-primary" /><span className="font-medium">Meus Treinos</span></CardContent></Card></Link>
        <Link to="/aluno/dietas"><Card className="hover:border-primary"><CardContent className="flex items-center gap-4 p-6"><Apple className="h-8 w-8 text-primary" /><span className="font-medium">Minha Dieta</span></CardContent></Card></Link>
        <Link to="/aluno/evolucao"><Card className="hover:border-primary"><CardContent className="flex items-center gap-4 p-6"><TrendingUp className="h-8 w-8 text-primary" /><span className="font-medium">Evolução</span></CardContent></Card></Link>
      </main>
    </div>
  );
}
