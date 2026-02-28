# Cloudsyva 官網（Vite + React + TypeScript）

此專案已改為 **Vite**，不再使用 Next.js。

## 跑起來程序

### 1) 安裝

```bash
corepack enable
corepack pnpm install
```

### 2) 本機開發（直接用 Vite 跑）

```bash
corepack pnpm dev
```

預設網址：`http://localhost:5173`

### 3) 建置與預覽

```bash
corepack pnpm build
corepack pnpm preview
```

## 備註

- `pnpm dev` 現在對應的是 `vite`，不會再執行 `next dev`。
- 若先前有開過 Next.js，可刪除 `.next/` 快取後再重跑。


本機開發（直接用 Vite 跑）
corepack pnpm dev
