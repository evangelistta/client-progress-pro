import { Link } from 'react-router-dom';
import { useStudentData } from '@/hooks/useStudentData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Camera } from 'lucide-react';

export default function StudentEvolution() {
  const { measurements, progressPhotos } = useStudentData();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card"><div className="container mx-auto px-4 py-4"><Link to="/aluno"><Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button></Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Minha Evolução</h1>
        <div className="grid gap-6">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Medidas</CardTitle></CardHeader>
            <CardContent>{measurements?.length === 0 ? <p className="text-muted-foreground">Nenhuma medida registrada ainda.</p> : measurements?.slice(0, 3).map((m) => <div key={m.id} className="border-b py-2 last:border-0"><p className="text-sm"><strong>{m.measured_at}</strong> - Peso: {m.weight}kg</p></div>)}</CardContent>
          </Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Camera className="h-5 w-5" />Fotos de Progresso</CardTitle></CardHeader>
            <CardContent>{progressPhotos?.length === 0 ? <p className="text-muted-foreground">Nenhuma foto registrada ainda.</p> : <div className="grid grid-cols-3 gap-2">{progressPhotos?.slice(0, 6).map((p) => <img key={p.id} src={p.photo_url} alt="Progresso" className="aspect-square object-cover rounded" />)}</div>}</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
