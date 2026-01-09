import { Link } from 'react-router-dom';
import { useStudentData } from '@/hooks/useStudentData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Apple } from 'lucide-react';

export default function StudentDiets() {
  const { diets, isLoading } = useStudentData();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card"><div className="container mx-auto px-4 py-4"><Link to="/aluno"><Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button></Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Minha Dieta</h1>
        {isLoading ? <p>Carregando...</p> : diets?.length === 0 ? (
          <Card><CardContent className="py-16 text-center">
            <Apple className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma dieta cadastrada</h3>
            <p className="text-muted-foreground">Seu instrutor ainda não cadastrou sua dieta. Aguarde ou entre em contato.</p>
          </CardContent></Card>
        ) : (
          <div className="space-y-4">{diets?.map((d) => <Card key={d.id}><CardContent className="p-4"><h3 className="font-medium">{d.name}</h3><p className="text-sm text-muted-foreground">{d.meals?.length || 0} refeições</p></CardContent></Card>)}</div>
        )}
      </main>
    </div>
  );
}
