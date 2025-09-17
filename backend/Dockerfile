FROM node:20-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./
RUN npm ci || npm install --no-audit --no-fund

COPY backend/. .

ENV NODE_ENV=production

EXPOSE 4000
CMD ["node", "server.js"]


