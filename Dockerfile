FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY build ./build
COPY public ./public

EXPOSE 3000

CMD ["node", "build/server/index.js"]
