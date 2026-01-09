import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function TrainerStudentDetail() {
  const { id } = useParams();
  
  const { data: student } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const { data } = await supabase.from('students').select('*').eq('id', id!).single();
      return data;
    },
  });

  const { data: anamnesis } = useQuery({
    queryKey: ['anamnesis', id],
    queryFn: async () => {
      const { data } = await supabase.from('anamnesis').select('*').eq('student_id', id!).single();
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/trainer/alunos"><Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button></Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{student?.full_name}</h1>
        <Card>
          <CardHeader><CardTitle>Ficha de Anamnese</CardTitle></CardHeader>
          <CardContent>
            {anamnesis ? (
              <div className="space-y-2 text-sm">
                <p><strong>Objetivos:</strong> {anamnesis.objectives?.join(', ')}</p>
                <p><strong>Lesões:</strong> {anamnesis.injury_history || 'Nenhuma'}</p>
                <p><strong>Frequência:</strong> {anamnesis.training_frequency}x/semana</p>
                <p><strong>Sono:</strong> {anamnesis.sleep_hours}h - {anamnesis.sleep_quality}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">Aluno ainda não preencheu a anamnese.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
