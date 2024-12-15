FROM node:22-alpine
COPY package.json .
COPY pnpm-lock.yaml .
COPY prisma/ ./prisma
RUN corepack enable
RUN pnpm i --frozen-lockfile
COPY config .
COPY src/ ./src
COPY tsconfig.json .
RUN pnpm run build
ENTRYPOINT ["pnpm", "run", "start"]