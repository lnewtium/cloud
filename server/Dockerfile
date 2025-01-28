FROM node:22-bookworm
COPY package.json .
COPY pnpm-lock.yaml .
COPY prisma/ ./prisma
RUN corepack enable
RUN pnpm i --frozen-lockfile
COPY config/ ./config
COPY src/ ./src
COPY tsconfig.json .
COPY .env .
RUN pnpm run build
ENTRYPOINT ["pnpm", "run", "start"]