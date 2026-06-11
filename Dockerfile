FROM node:20-alpine

WORKDIR /app

# Yarn 4 (Berry) is pinned via packageManager + the binary committed in .yarn/releases.
# corepack execs that pinned binary (no download) because .yarnrc.yml sets yarnPath.
RUN corepack enable

# Install dependencies first (layer cached unless lockfile changes).
# nodeLinker is "node-modules", so this produces a normal node_modules tree.
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

# Copy the rest of the source.
COPY . .

# ── Build-time configuration ──────────────────────────────────────────────
# NEXT_PUBLIC_* values are inlined into the client bundle during `next build`,
# so they must be present here. MEDUSA_BACKEND_URL must be reachable while
# building (generateStaticParams fetches the store API), so we pass the PUBLIC
# backend URL as the build arg; at runtime docker-compose overrides it with the
# internal service URL (http://medusa-server:9000) for faster server-side calls.
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION \
    MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL

RUN yarn build

ENV NODE_ENV=production
EXPOSE 8000

CMD ["yarn", "start"]
