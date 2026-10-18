# syntax=docker/dockerfile:1

# ---- Build: SvelteKit, prerendered to static files -------------------------------
FROM node:24-alpine AS build
WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run check && npm run build

# ---- Serve: Caddy over plain HTTP, behind the front proxy ----------------------
FROM caddy:2.11.7-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /site/build /srv
EXPOSE 80
