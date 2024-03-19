# アプリ概要

- Next.jsとPrismaを使った練習リポジトリです。

# 技術スタック

- Next.js (ver 14.1.3)
- React (ver 18.x)
- TypeScript
- zod
- prisma
- ant design
- full calendar
- react-hook-form
- prettier

# 起動方法

必要なパッケージをinstall

```
npm ci
```

起動する。

```
npm start
```

# ブランチ運用ルール

- main: リリースブランチ
  - feature: 機能開発ブランチ
  - hotfix: 緊急修正ブランチ

# マージ運用ルール
マージコミットは作るようにする


# コミットメッセージ

- feat: 機能追加
- fix: バグ修正
- docs: ドキュメントのみ変更
- style: 空白、フォーマット、セミコロンなどの修正のみ
- refactor: 仕様に影響を与えないコード修正
- perf: パフォーマンス向上
- test: テスト関連
- chore: ビルドプロセス、補助ツール、ライブラリなどの補助ツールや補助ライブラリの変更
