import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function useStudentData() {
  const { user, userRole } = useAuth();

  const { data: studentRecord, isLoading: studentLoading } = useQuery({
    queryKey: ['student-record', user?.id],
    queryFn: async () => {
      if (!user || userRole !== 'student') return null;

      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user && userRole === 'student',
  });

  const { data: anamnesis, isLoading: anamnesisLoading } = useQuery({
    queryKey: ['anamnesis', studentRecord?.id],
    queryFn: async () => {
      if (!studentRecord?.id) return null;

      const { data, error } = await supabase
        .from('anamnesis')
        .select('*')
        .eq('student_id', studentRecord.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!studentRecord?.id,
  });

  const { data: workouts, isLoading: workoutsLoading } = useQuery({
    queryKey: ['student-workouts', studentRecord?.id],
    queryFn: async () => {
      if (!studentRecord?.id) return [];

      const { data, error } = await supabase
        .from('workouts')
        .select(`
          *,
          exercises (*)
        `)
        .eq('student_id', studentRecord.id)
        .eq('is_active', true)
        .order('day_of_week', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!studentRecord?.id,
  });

  const { data: diets, isLoading: dietsLoading } = useQuery({
    queryKey: ['student-diets', studentRecord?.id],
    queryFn: async () => {
      if (!studentRecord?.id) return [];

      const { data, error } = await supabase
        .from('diets')
        .select(`
          *,
          meals (*)
        `)
        .eq('student_id', studentRecord.id)
        .eq('is_active', true)
        .order('day_of_week', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!studentRecord?.id,
  });

  const { data: measurements, isLoading: measurementsLoading } = useQuery({
    queryKey: ['student-measurements', studentRecord?.id],
    queryFn: async () => {
      if (!studentRecord?.id) return [];

      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .eq('student_id', studentRecord.id)
        .order('measured_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!studentRecord?.id,
  });

  const { data: progressPhotos, isLoading: photosLoading } = useQuery({
    queryKey: ['student-progress-photos', studentRecord?.id],
    queryFn: async () => {
      if (!studentRecord?.id) return [];

      const { data, error } = await supabase
        .from('progress_photos')
        .select('*')
        .eq('student_id', studentRecord.id)
        .order('taken_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!studentRecord?.id,
  });

  return {
    studentRecord,
    anamnesis,
    workouts,
    diets,
    measurements,
    progressPhotos,
    isLoading: studentLoading || anamnesisLoading || workoutsLoading || dietsLoading || measurementsLoading || photosLoading,
    needsAnamnesis: studentRecord && !studentRecord.anamnesis_completed,
  };
}
