### Installation guide
Setup [nvm](https://github.com/nvm-sh/nvm)
#### Server side
1) Setup Postgres
2) Setup .env and config/default.json
3) `nvm install lts/*`
4) `nvm use`
5) `corepack enable`
6) `pnpm i`
7) `pnpx prisma db push`
8) `pnpm run dev`

#### Client side
1) Set dev mode in client/src/config.ts
2) `nvm use`
3) `pnpm i`
4) `pnpm run dev`