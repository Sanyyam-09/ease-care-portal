
-- Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view own appointments" ON public.appointments
  FOR SELECT TO authenticated USING (auth.uid() = patient_id);

CREATE POLICY "Patients can create appointments" ON public.appointments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can cancel own appointments" ON public.appointments
  FOR UPDATE TO authenticated USING (auth.uid() = patient_id);

-- Medical records table
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  record_type TEXT NOT NULL DEFAULT 'other',
  description TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records" ON public.medical_records
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can upload records" ON public.medical_records
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own records" ON public.medical_records
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Storage bucket for medical records
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-records', 'medical-records', false);

CREATE POLICY "Users can upload own records" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'medical-records' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can view own records" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'medical-records' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own records" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'medical-records' AND (storage.foldername(name))[1] = auth.uid()::text);
