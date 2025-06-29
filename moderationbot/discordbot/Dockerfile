# ---------- build stage ----------
FROM node:22-alpine AS build
WORKDIR /discordbot

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build          

# ---------- runtime stage ----------
FROM node:22-alpine
WORKDIR /discordbot
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev      

COPY --from=build /discordbot/dist ./dist

CMD ["node", "dist/index.js"]
