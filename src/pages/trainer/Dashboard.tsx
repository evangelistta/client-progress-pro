import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Dumbbell, LogOut, Link as LinkIcon, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function TrainerDashboard() {
  const { user, signOut } = useAuth();

  const { data: students } = useQuery({
    queryKey: ['trainer-students', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('students').select('*').eq('trainer_id', user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const inviteLink = `${window.location.origin}/register?ref=${user?.id}`;

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success('Link copiado!');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            Painel do Instrutor
          </h1>
          <Button variant="ghost" onClick={signOut}><LogOut className="h-4 w-4 mr-2" />Sair</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader><CardTitle className="flex items-center gap-2"><LinkIcon className="h-5 w-5" />Link de Convite</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Compartilhe este link com seus alunos para eles se cadastrarem:</p>
            <div className="flex gap-2">
              <code className="flex-1 bg-muted p-3 rounded text-sm break-all">{inviteLink}</code>
              <Button onClick={copyInviteLink}><Copy className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Meus Alunos</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{students?.length || 0}</p>
              <Link to="/trainer/alunos"><Button className="mt-4 w-full">Ver Alunos</Button></Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
