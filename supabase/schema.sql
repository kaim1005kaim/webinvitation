-- RSVPテーブルの作成
CREATE TABLE IF NOT EXISTS rsvp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attendance BOOLEAN NOT NULL,
  guests INTEGER DEFAULT 0,
  allergy TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX idx_rsvp_email ON rsvp(email);
CREATE INDEX idx_rsvp_created_at ON rsvp(created_at DESC);

-- RLS (Row Level Security) の有効化
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- 挿入ポリシーの作成（誰でも挿入可能）
CREATE POLICY "Anyone can insert RSVP" ON rsvp
  FOR INSERT WITH CHECK (true);

-- 読み取りポリシーの作成（認証されたユーザーのみ）
CREATE POLICY "Authenticated users can read RSVP" ON rsvp
  FOR SELECT USING (auth.role() = 'authenticated');