# 使用 Node.js 20 Alpine 版本為基礎映像
FROM node:20-alpine AS builder

WORKDIR /app

# 安裝 corepack 並啟用 Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# 複製必要檔案以安裝相依
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# 安裝相依（生產與開發用）
RUN yarn install --immutable

# 複製全部專案檔案
COPY . .

# 建置 Next.js 專案
RUN yarn build

# ===========================
# 第二階段：正式運行容器
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# 複製必要檔案（不包含開發依賴）
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/.yarn ./.yarn

EXPOSE 3000

CMD ["yarn", "start"]
