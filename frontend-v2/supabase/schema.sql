-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  position INTEGER,
  verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  source VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_token ON waitlist(verification_token);

-- Set up Row Level Security (RLS) if needed, strictly protecting user data
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for signups)
CREATE POLICY "Allow public insert to waitlist" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Allow only admins/service role to select (optional, depending on your auth setup)
-- For now, we might rely on service role key in backend, so no specific select policy for anon needed
