FROM node:20-alpine AS base

WORKDIR /app

# 安裝 corepack 和 yarn，並啟用 corepack
RUN npm install -g corepack yarn && corepack enable

# Copy yarn configuration
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY .pnp.cjs .pnp.loader.mjs ./
COPY package.json ./

RUN yarn set version stable

# Install dependencies
RUN yarn install

# Copy application code
COPY . .

RUN yarn set version stable

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]