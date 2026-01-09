import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import TrainerDashboard from '@/pages/trainer/Dashboard';
import TrainerStudents from '@/pages/trainer/Students';
import TrainerStudentDetail from '@/pages/trainer/StudentDetail';
import StudentDashboard from '@/pages/student/Dashboard';
import StudentWorkouts from '@/pages/student/Workouts';
import StudentDiets from '@/pages/student/Diets';
import StudentEvolution from '@/pages/student/Evolution';
import Anamnesis from '@/pages/student/Anamnesis';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles?: ('trainer' | 'student')[];
}) {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        user ? (
          userRole === 'trainer' ? <Navigate to="/trainer" replace /> : <Navigate to="/aluno" replace />
        ) : (
          <Index />
        )
      } />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      
      {/* Trainer Routes */}
      <Route path="/trainer" element={
        <ProtectedRoute allowedRoles={['trainer']}>
          <TrainerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/trainer/alunos" element={
        <ProtectedRoute allowedRoles={['trainer']}>
          <TrainerStudents />
        </ProtectedRoute>
      } />
      <Route path="/trainer/aluno/:id" element={
        <ProtectedRoute allowedRoles={['trainer']}>
          <TrainerStudentDetail />
        </ProtectedRoute>
      } />

      {/* Student Routes */}
      <Route path="/aluno" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/aluno/treinos" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentWorkouts />
        </ProtectedRoute>
      } />
      <Route path="/aluno/dietas" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDiets />
        </ProtectedRoute>
      } />
      <Route path="/aluno/evolucao" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentEvolution />
        </ProtectedRoute>
      } />
      <Route path="/aluno/anamnese" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Anamnesis />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
