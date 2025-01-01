FROM node:22 AS builder

WORKDIR /build

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/package.json ./

RUN npm install --ignore-scripts --omit=dev \
  && npm uninstall bcrypt \
  && npm install bcrypt

COPY --from=builder /build/dist/* ./

EXPOSE 5001

CMD [ "npm" , "start" ]