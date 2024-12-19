FROM node:22-alpine AS build
RUN rm -rf /usr/share/nginx/html/*
COPY pnpm-lock.yaml .
COPY package.json .
RUN corepack enable
RUN pnpm i --frozen-lockfile
COPY vite.config.ts .
COPY vite-env.d.ts .
COPY index.html .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY src ./src
COPY public ./public
RUN pnpm run build
FROM nginx:1.26-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build ./dist/ /usr/share/nginx/html/cloud/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]