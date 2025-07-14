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
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvp(email);
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);

-- RLS (Row Level Security) の有効化
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- 既存のポリシーを削除（存在する場合）
DROP POLICY IF EXISTS "Anyone can insert RSVP" ON rsvp;
DROP POLICY IF EXISTS "Authenticated users can read RSVP" ON rsvp;

-- 新しい挿入ポリシーの作成（匿名ユーザーも含めて誰でも挿入可能）
CREATE POLICY "Anyone can insert RSVP" ON rsvp
  FOR INSERT TO public
  WITH CHECK (true);

-- 読み取りポリシーの作成（認証されたユーザーのみ - 管理者用）
CREATE POLICY "Authenticated users can read RSVP" ON rsvp
  FOR SELECT TO authenticated
  USING (true);

-- 管理者用の更新・削除ポリシー（必要に応じて）
CREATE POLICY "Authenticated users can update RSVP" ON rsvp
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete RSVP" ON rsvp
  FOR DELETE TO authenticated
  USING (true);