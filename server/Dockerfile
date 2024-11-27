FROM node:22-alpine
COPY package.json .
COPY pnpm-lock.yaml .
RUN corepack enable
RUN pnpm ci
COPY config .
COPY src/ .
COPY tsconfig.json .
RUN pnpm run build
ENTRYPOINT ["npm", "run", "start"]