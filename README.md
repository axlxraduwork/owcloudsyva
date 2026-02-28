# Cloudsyva 官網重建（Vite + React + TypeScript）

此版本已由 Next.js 調整為 `pnpm + Vite + React + TypeScript`，並建立以下站點結構：

- 網站首頁 `/`
- 公司介紹 `/about`
- 趨勢文章 `/trends`
- 聯繫我們 `/contact`

## 技術架構

- `Vite`：前端建置與開發伺服器
- `React + TypeScript`：頁面開發
- `React Router`：多頁路由結構
- `Redux Toolkit + React Redux`：狀態管理

## Redux 分類

- `src/features/ui/uiSlice.ts`
  - 首頁世界地圖互動狀態（目前聚焦區域、滑鼠互動位置）
- `src/features/trends/trendsSlice.ts`
  - CMS/API 文章載入、分類、分頁狀態
- `src/features/contact/contactSlice.ts`
  - 聯繫表單輸入與送出狀態
- `src/app/store.ts`
  - 全站 store 組裝

## 趨勢文章 CMS/API 串接

### 環境變數

建立 `.env`：

```bash
VITE_CMS_API_BASE=https://your-cms-api.example.com
VITE_CMS_TRENDS_ENDPOINT=/trends
```

- `VITE_CMS_API_BASE`：CMS API 主機
- `VITE_CMS_TRENDS_ENDPOINT`：趨勢文章 endpoint（預設 `/trends`）

### 前端請求格式

前端會用以下 query 呼叫：

- `category`: 分類（例如 `All`、`Applied AI`）
- `page`: 頁碼（從 `1` 開始）
- `pageSize`: 每頁筆數（預設 `6`）

### CMS 回應格式（JSON）

```json
{
  "items": [
    {
      "id": "1",
      "title": "文章標題",
      "summary": "摘要",
      "tag": "Applied AI",
      "category": "Applied AI",
      "date": "2026-02-18",
      "slug": "article-slug"
    }
  ],
  "page": 1,
  "pageSize": 6,
  "total": 20,
  "categories": ["All", "Applied AI", "Cloud Governance"]
}
```

若 API 不可用，會自動 fallback 到本地 mock 文章資料，頁面仍可運作。

## 首頁視覺方向

- 藍黃主色系
- Apple 風格玻璃感（glassmorphism）
- 世界地圖互動：
  - 區域切換按鈕
  - 地圖熱點發光與 pulse 動畫
  - 滑鼠移動造成光暈追蹤

## 啟動

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

## 建置

```bash
corepack pnpm build
corepack pnpm preview
```
