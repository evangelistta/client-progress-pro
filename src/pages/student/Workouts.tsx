import { Link } from 'react-router-dom';
import { useStudentData } from '@/hooks/useStudentData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Dumbbell } from 'lucide-react';

export default function StudentWorkouts() {
  const { workouts, isLoading } = useStudentData();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card"><div className="container mx-auto px-4 py-4"><Link to="/aluno"><Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button></Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Meus Treinos</h1>
        {isLoading ? <p>Carregando...</p> : workouts?.length === 0 ? (
          <Card><CardContent className="py-16 text-center">
            <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum treino cadastrado</h3>
            <p className="text-muted-foreground">Seu instrutor ainda não cadastrou seu treino. Aguarde ou entre em contato.</p>
          </CardContent></Card>
        ) : (
          <div className="space-y-4">{workouts?.map((w) => <Card key={w.id}><CardContent className="p-4"><h3 className="font-medium">{w.name}</h3><p className="text-sm text-muted-foreground">{w.exercises?.length || 0} exercícios</p></CardContent></Card>)}</div>
        )}
      </main>
    </div>
  );
}
