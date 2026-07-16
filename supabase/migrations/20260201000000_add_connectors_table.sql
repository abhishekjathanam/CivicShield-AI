CREATE TABLE public.data_connectors (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    type text NOT NULL,
    status text NOT NULL DEFAULT 'inactive',
    config jsonb DEFAULT '{}'::jsonb,
    last_sync timestamptz,
    records_imported integer DEFAULT 0,
    error_message text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.data_connectors ENABLE ROW LEVEL SECURITY;

-- Allow read access for authenticated users with analyst role
CREATE POLICY "Allow read access for analysts and admins" ON public.data_connectors
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND (user_roles.role = 'analyst' OR user_roles.role = 'admin')
        )
    );

-- Allow full access for admins and analysts to manage connectors
CREATE POLICY "Allow all access for analysts and admins" ON public.data_connectors
    FOR ALL USING (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND (user_roles.role = 'analyst' OR user_roles.role = 'admin')
        )
    );
