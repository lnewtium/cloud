### Installation guide
Setup [nvm](https://github.com/nvm-sh/nvm)
#### Server side
1) Setup Postgres
2) Setup .env and config/default.json
3) `nvm install lts/*`
4) `cd server`
5) `nvm use`
6) `corepack enable`
7) `pnpm i`
8) `pnpx prisma db push`
9) `pnpm run dev`

#### Client side
1) Set dev mode in client/src/config.ts
2) `cd client`
3) `nvm use`
4) `pnpm i`
5) `pnpm run dev`