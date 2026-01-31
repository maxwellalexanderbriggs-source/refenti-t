-- Storage RLS Policies for refenti-media bucket
-- Note: The bucket must be created manually first via Supabase Dashboard

-- Public read access - anyone can view images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'refenti-media');

-- Authenticated users can upload files
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'refenti-media');

-- Authenticated users can delete files
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'refenti-media');

-- Authenticated users can update files (for upsert)
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'refenti-media')
WITH CHECK (bucket_id = 'refenti-media');
