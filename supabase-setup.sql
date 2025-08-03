-- ArdhiX Supabase Database Schema
-- This script sets up the required tables for the ArdhiX land registry system

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'verifier')),
  avatar TEXT,
  phone TEXT,
  national_id TEXT,
  bio TEXT,
  location TEXT,
  date_joined DATE DEFAULT CURRENT_DATE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('residential', 'commercial', 'agricultural', 'industrial')) NOT NULL,
  location TEXT NOT NULL,
  county TEXT NOT NULL,
  ward TEXT,
  size TEXT NOT NULL,
  status TEXT CHECK (status IN ('verified', 'pending', 'rejected')) DEFAULT 'pending',
  value DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  coordinates_lat DECIMAL(10,8),
  coordinates_lng DECIMAL(11,8),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property documents table
CREATE TABLE IF NOT EXISTS public.property_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('title_deed', 'survey_map', 'valuation', 'tax_receipt', 'other')) NOT NULL,
  url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property transfers table
CREATE TABLE IF NOT EXISTS public.property_transfers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  from_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  to_name TEXT,
  to_email TEXT,
  to_phone TEXT,
  to_national_id TEXT,
  transfer_reason TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'completed')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property history/audit log
CREATE TABLE IF NOT EXISTS public.property_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  performed_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON public.properties(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_county ON public.properties(county);
CREATE INDEX IF NOT EXISTS idx_property_documents_property_id ON public.property_documents(property_id);
CREATE INDEX IF NOT EXISTS idx_property_transfers_property_id ON public.property_transfers(property_id);
CREATE INDEX IF NOT EXISTS idx_property_history_property_id ON public.property_history(property_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_property_transfers_updated_at ON public.property_transfers;
CREATE TRIGGER update_property_transfers_updated_at
  BEFORE UPDATE ON public.property_transfers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Users can view their own properties" ON public.properties
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own properties" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" ON public.properties
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all properties" ON public.properties
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Property documents policies
CREATE POLICY "Users can view documents of their properties" ON public.property_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert documents for their properties" ON public.property_documents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND user_id = auth.uid()
    )
  );

-- Property transfers policies
CREATE POLICY "Users can view transfers of their properties" ON public.property_transfers
  FOR SELECT USING (
    auth.uid() = from_user_id OR auth.uid() = to_user_id OR
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND user_id = auth.uid()
    )
  );

-- Property history policies
CREATE POLICY "Users can view history of their properties" ON public.property_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND user_id = auth.uid()
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Insert default admin user data (this will be triggered when admin signs up)
-- The actual user will be created in auth.users, this is just for reference