FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN yarn install
COPY --from=builder /app/out/full/ .
RUN yarn turbo build --filter=backend...

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer --chown=nextjs:nodejs /app/apps/backend/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/backend/.next/static ./apps/backend/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/backend/public ./apps/backend/public

CMD node apps/backend/server.js