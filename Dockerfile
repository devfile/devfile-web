
# Install dependencies only when needed
FROM node:16-alpine AS deps
ARG PROJECT_NAME
# Check if the PROJECT_NAME build argument is set
RUN \
  if [ "$PROJECT_NAME" == "landing-page" ] || [ "$PROJECT_NAME" == "registry-viewer" ]; then echo "Building project \"${PROJECT_NAME}\"."; \
  else echo "Build argument \"PROJECT_NAME\" needs to be set to either \"landing-page\" or \"registry-viewer\"." && exit 1; \
  fi 
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
ARG PROJECT_NAME
# Add bash to support local scripts
RUN apk add --no-cache bash
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn nx run ${PROJECT_NAME}:postexport --skip-nx-cache

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
ARG PROJECT_NAME
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/${PROJECT_NAME}/dist/public ./apps/${PROJECT_NAME}/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME}/dist/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME}/dist/.next/static ./apps/${PROJECT_NAME}/dist/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Add an env to save server.js path
ENV SERVERJS_PATH=apps/${PROJECT_NAME}/server.js

CMD node ${SERVERJS_PATH}