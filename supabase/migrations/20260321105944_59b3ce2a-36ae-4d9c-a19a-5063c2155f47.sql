
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pin_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'patient');
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile + patient role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'patient');
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Doctors table
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  qualification TEXT,
  experience_years INT,
  hospital TEXT,
  location TEXT,
  city TEXT,
  state TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  trust_score INT DEFAULT 0,
  consultation_fee INT,
  available BOOLEAN DEFAULT true,
  avatar_initials TEXT,
  certificate_verified BOOLEAN DEFAULT false,
  certificate_url TEXT,
  bio TEXT,
  languages TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Doctors are publicly readable" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Admins can manage doctors" ON public.doctors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Doctor reviews
CREATE TABLE public.doctor_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.doctor_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are publicly readable" ON public.doctor_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.doctor_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.doctor_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.doctor_reviews FOR DELETE USING (auth.uid() = user_id);

-- Hospitals
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  city TEXT,
  state TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  trust_score INT DEFAULT 0,
  accreditation TEXT,
  certificate_verified BOOLEAN DEFAULT false,
  image_url TEXT,
  description TEXT,
  offers TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hospitals are publicly readable" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Admins can manage hospitals" ON public.hospitals FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Hospital rooms
CREATE TABLE public.hospital_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  room_type TEXT NOT NULL, -- 'private', 'semi_private', 'general', 'emergency', 'icu'
  price_per_day INT,
  image_url TEXT,
  description TEXT,
  amenities TEXT[]
);
ALTER TABLE public.hospital_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Rooms are publicly readable" ON public.hospital_rooms FOR SELECT USING (true);

-- Procedure pricing
CREATE TABLE public.procedure_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  procedure_name TEXT NOT NULL,
  category TEXT,
  base_price INT NOT NULL,
  surgeon_fee INT,
  anesthesia_fee INT,
  room_charges INT,
  medicine_cost INT,
  nursing_charges INT,
  misc_charges INT,
  total_estimate INT NOT NULL,
  notes TEXT
);
ALTER TABLE public.procedure_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pricing is publicly readable" ON public.procedure_pricing FOR SELECT USING (true);

-- Government schemes
CREATE TABLE public.government_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  eligibility_criteria TEXT,
  benefits TEXT,
  coverage_amount INT,
  applicable_states TEXT[],
  website_url TEXT,
  is_active BOOLEAN DEFAULT true
);
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Schemes are publicly readable" ON public.government_schemes FOR SELECT USING (true);

-- NGO services
CREATE TABLE public.ngo_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_name TEXT NOT NULL,
  service_type TEXT NOT NULL, -- 'blood_camp', 'free_checkup', 'medicine_distribution', etc.
  description TEXT,
  location TEXT,
  city TEXT,
  state TEXT,
  event_date DATE,
  event_time TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ngo_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "NGO services are publicly readable" ON public.ngo_services FOR SELECT USING (true);

-- Chat messages for AI chatbot
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own messages" ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
