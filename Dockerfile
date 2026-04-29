ARG NODE_IMAGE=node:20-alpine
FROM ${NODE_IMAGE}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY bridge.mjs README.md LICENSE glama.json ./

CMD ["node", "/app/bridge.mjs"]
