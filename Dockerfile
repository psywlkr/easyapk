FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json .npmrc ./
RUN npm install --legacy-peer-deps

COPY build ./build
COPY public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
