# MEGA Official 預約系統

## 專案簡介

MEGA Official 是一個多步驟預約系統範例，使用者可依序填寫個人資訊、選擇服務、設定日期與時段，並最終確認預約；後端 API 處理預約資料並發送通知郵件。

## 使用技術

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- Firebase
- Next.js API Routes (Node.js)
- Mail Service (Nodemailer)

## 安裝與執行

1. 下載專案並安裝相依套件  
   ```bash
   git clone https://github.com/Yizhe0407/mega-official.git
   cd mega-official
   yarn install
   ```
2. 環境變數設定  
   根目錄建立 `.env.local`，範例內容：
   ```env
   FIREBASE_API_KEY=你的 Firebase API Key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=你的 Firebase Auth Domain
   # 其他必要的環境變數...
   ```
3. 啟動開發伺服器  
   ```bash
   yarn dev
   ```
4. 開啟瀏覽器並前往 [http://localhost:3000](http://localhost:3000)

## 功能列表

- 多步驟預約流程（使用者資訊、服務選擇、日期時間、確認）  
- 實時進度條(ProgressBar)  
- 日曆與時段選擇元件  
- 表單驗證與狀態管理 (Zustand)  
- 與 Firebase 整合 (儲存預約資料)  
- API Route 處理預約與發送郵件  

## API 說明

### POST /api/reserve  
- 功能：接收預約資料並寫入 Firebase  
- 請求範例：
  ```json
  {
    "name": "王小明",
    "email": "xiaoming@example.com",
    "service": "保養",
    "date": "2025-07-22",
    "time": "14:00"
  }
  ```
- 回應：  
  - 200 OK：`{ "message": "預約成功" }`  
  - 400 Bad Request：`{ "error": "缺少參數" }`

### POST /api/send-mail  
- 功能：透過第三方服務發送確認郵件  
- 請求範例：
  ```json
  {
    "to": "xiaoming@example.com",
    "subject": "預約確認信",
    "text": "您的預約已成功..."
  }
  ```
- 回應：  
  - 200 OK：`{ "message": "郵件已發送" }`  
  - 500 Internal Server Error：`{ "error": "發送失敗" }`

## 部署指南

1. 建議使用 [Vercel](https://vercel.com/) 一鍵部署  
2. 在 Vercel 專案設定中，添加與開發相同的環境變數
3. 部署後，平台會自動執行 `yarn build` 並啟動應用  
4. 完成後即可透過 Vercel 提供的域名存取