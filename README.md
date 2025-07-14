# Wedding Invitation Website

Next.js と Tailwind CSS を使用した結婚式招待状のWebサイトです。

## 機能

- **ヒーローセクション**: 新郎新婦名、日付、キャッチコピー表示
- **詳細情報**: 挙式・披露宴の日時、会場、アクセス情報
- **タイムライン**: 当日の流れを視覚的に表示
- **ギャラリー**: 写真とストーリーの表示
- **RSVP フォーム**: 出欠確認、アレルギー情報の収集
- **SNS 共有**: Twitter、Facebook、LINE での共有機能

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **フォーム**: React Hook Form + Zod
- **データベース**: Supabase
- **デプロイ**: Vercel

## セットアップ

1. **依存関係のインストール**
   \`\`\`bash
   pnpm install
   \`\`\`

2. **環境変数の設定**
   \`.env.local\` ファイルを作成し、以下を設定：
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_MAP_KEY=your_google_maps_api_key
   NEXT_PUBLIC_ACCENT_COLOR=#D9CDBF
   \`\`\`

3. **Supabase データベースの設定**
   \`supabase/schema.sql\` のSQLを実行してテーブルを作成

4. **画像の配置**
   \`public/images/\` フォルダに必要な画像を配置

5. **開発サーバーの起動**
   \`\`\`bash
   pnpm dev
   \`\`\`

## デプロイ

1. **Vercel へのデプロイ**
   \`\`\`bash
   vercel
   \`\`\`

2. **環境変数の設定**
   Vercel ダッシュボードで環境変数を設定

## カスタマイズ

### カラーテーマの変更
\`tailwind.config.ts\` でカラーパレットを編集

### コンテンツの編集
\`app/page.tsx\` でデータを編集

### コンポーネントの追加
\`components/\` フォルダに新しいコンポーネントを追加

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。