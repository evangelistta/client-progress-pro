import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dumbbell, Users, ChartLine, Apple } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Client Progress Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gerencie seus alunos com excelência
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma completa para personal trainers criarem treinos personalizados, 
            acompanharem a evolução e manterem seus alunos motivados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tudo que você precisa em um só lugar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestão de Alunos</h3>
              <p className="text-muted-foreground">
                Cadastre e acompanhe todos os seus alunos em um único painel.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <Dumbbell className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Treinos Personalizados</h3>
              <p className="text-muted-foreground">
                Crie treinos específicos para cada aluno com facilidade.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <Apple className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dietas Completas</h3>
              <p className="text-muted-foreground">
                Monte planos alimentares com macros e horários detalhados.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <ChartLine className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Acompanhamento</h3>
              <p className="text-muted-foreground">
                Monitore a evolução com fotos, medidas e gráficos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Client Progress Pro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
