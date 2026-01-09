import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentData } from '@/hooks/useStudentData';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const objectives = ['Hipertrofia', 'Emagrecimento', 'Condicionamento', 'Força', 'Flexibilidade', 'Saúde geral'];

export default function Anamnesis() {
  const { studentRecord } = useStudentData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    injury_history: '', surgeries: '', medications: '', health_conditions: '',
    objectives: [] as string[], training_frequency: 3, eating_habits: '',
    sleep_hours: 7, sleep_quality: 'boa', physical_limitations: '', additional_notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentRecord) return;
    setIsLoading(true);

    const { error } = await supabase.from('anamnesis').insert({ ...form, student_id: studentRecord.id });
    if (!error) {
      await supabase.from('students').update({ anamnesis_completed: true }).eq('id', studentRecord.id);
      toast.success('Anamnese salva com sucesso!');
      navigate('/aluno');
    } else {
      toast.error('Erro ao salvar');
    }
    setIsLoading(false);
  };

  const toggleObjective = (obj: string) => {
    setForm(f => ({ ...f, objectives: f.objectives.includes(obj) ? f.objectives.filter(o => o !== obj) : [...f.objectives, obj] }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader><CardTitle>Ficha de Anamnese</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><Label>Objetivos</Label><div className="grid grid-cols-2 gap-2 mt-2">{objectives.map(o => (
              <div key={o} className="flex items-center gap-2"><Checkbox checked={form.objectives.includes(o)} onCheckedChange={() => toggleObjective(o)} /><span className="text-sm">{o}</span></div>
            ))}</div></div>
            <div><Label>Histórico de lesões</Label><Textarea value={form.injury_history} onChange={e => setForm(f => ({ ...f, injury_history: e.target.value }))} placeholder="Descreva lesões anteriores..." /></div>
            <div><Label>Cirurgias</Label><Textarea value={form.surgeries} onChange={e => setForm(f => ({ ...f, surgeries: e.target.value }))} placeholder="Cirurgias realizadas..." /></div>
            <div><Label>Medicamentos em uso</Label><Input value={form.medications} onChange={e => setForm(f => ({ ...f, medications: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Frequência de treino (dias/semana)</Label><Input type="number" min={1} max={7} value={form.training_frequency} onChange={e => setForm(f => ({ ...f, training_frequency: +e.target.value }))} /></div>
              <div><Label>Horas de sono</Label><Input type="number" min={1} max={12} value={form.sleep_hours} onChange={e => setForm(f => ({ ...f, sleep_hours: +e.target.value }))} /></div>
            </div>
            <div><Label>Hábitos alimentares</Label><Textarea value={form.eating_habits} onChange={e => setForm(f => ({ ...f, eating_habits: e.target.value }))} placeholder="Descreva sua alimentação atual..." /></div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvando...</> : 'Salvar e Continuar'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
