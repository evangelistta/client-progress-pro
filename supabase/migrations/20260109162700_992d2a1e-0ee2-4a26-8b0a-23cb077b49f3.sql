-- Create anamnesis table for student health questionnaire
CREATE TABLE public.anamnesis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  injury_history TEXT,
  surgeries TEXT,
  medications TEXT,
  health_conditions TEXT,
  objectives TEXT[] DEFAULT '{}',
  training_frequency INTEGER,
  available_days TEXT[],
  eating_habits TEXT,
  sleep_hours INTEGER,
  sleep_quality TEXT,
  physical_limitations TEXT,
  additional_notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.anamnesis ENABLE ROW LEVEL SECURITY;

-- Policies for anamnesis
CREATE POLICY "Students can insert their own anamnesis"
ON public.anamnesis FOR INSERT
WITH CHECK (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid()
));

CREATE POLICY "Students can view their own anamnesis"
ON public.anamnesis FOR SELECT
USING (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid() OR trainer_id = auth.uid()
));

CREATE POLICY "Students can update their own anamnesis"
ON public.anamnesis FOR UPDATE
USING (student_id IN (
  SELECT id FROM public.students WHERE user_id = auth.uid()
));

-- Add anamnesis_completed field to students table
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS anamnesis_completed BOOLEAN DEFAULT false;

-- Add photo_visibility field to progress_photos
ALTER TABLE public.progress_photos ADD COLUMN IF NOT EXISTS visible_to_trainer BOOLEAN DEFAULT true;

-- Create trigger for updated_at
CREATE TRIGGER update_anamnesis_updated_at
BEFORE UPDATE ON public.anamnesis
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();