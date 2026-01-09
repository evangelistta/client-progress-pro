import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User } from 'lucide-react';

export default function TrainerStudents() {
  const { user } = useAuth();

  const { data: students } = useQuery({
    queryKey: ['trainer-students', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('students').select('*').eq('trainer_id', user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/trainer"><Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button></Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Meus Alunos</h1>
        {students?.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">Nenhum aluno cadastrado. Compartilhe seu link de convite!</CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {students?.map((s) => (
              <Link key={s.id} to={`/trainer/aluno/${s.id}`}>
                <Card className="hover:border-primary transition-colors">
                  <CardContent className="flex items-center gap-4 p-4">
                    <User className="h-10 w-10 text-muted-foreground" />
                    <div><p className="font-medium">{s.full_name}</p><p className="text-sm text-muted-foreground">{s.email}</p></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
