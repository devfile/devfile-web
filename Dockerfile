
# Install dependencies only when needed
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal AS deps
USER root

# Install yarn
RUN \
  curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
  microdnf install -y yarn

# Project non-specific args
ARG PROJECT_NAME
ARG SITE_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_ANALYTICS_WRITE_KEY

# Landing page specific args
ARG NEXT_PUBLIC_DOCSEARCH_APP_ID
ARG NEXT_PUBLIC_DOCSEARCH_API_KEY
ARG NEXT_PUBLIC_DOCSEARCH_INDEX_NAME

# Check if the PROJECT_NAME build argument is set
RUN \
  if [ "$PROJECT_NAME" == "landing-page" ] || [ "$PROJECT_NAME" == "registry-viewer" ]; then echo "Building project \"${PROJECT_NAME}\"."; \
  else echo "Build argument \"PROJECT_NAME\" needs to be set to either \"landing-page\" or \"registry-viewer\"." && exit 1; \
  fi
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal AS builder
USER root

# Install yarn
RUN \
  curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
  microdnf install -y yarn

# Project non-specific args
ARG PROJECT_NAME
ARG SITE_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_ANALYTICS_WRITE_KEY

# Landing page specific args
ARG NEXT_PUBLIC_DOCSEARCH_APP_ID
ARG NEXT_PUBLIC_DOCSEARCH_API_KEY
ARG NEXT_PUBLIC_DOCSEARCH_INDEX_NAME

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn nx run ${PROJECT_NAME}:postexport --skip-nx-cache

# Production image, copy all the files and run next
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal AS runner
USER root

# Install shadow-utils to use groupadd and useradd
RUN microdnf install shadow-utils -y

# Project non-specific args
ARG PROJECT_NAME
ARG SITE_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_ANALYTICS_WRITE_KEY

# Landing page specific args
ARG NEXT_PUBLIC_DOCSEARCH_APP_ID
ARG NEXT_PUBLIC_DOCSEARCH_API_KEY
ARG NEXT_PUBLIC_DOCSEARCH_INDEX_NAME

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN groupadd -g 1001 nodejs
RUN useradd nextjs -u 1001

COPY --from=builder /app/apps/${PROJECT_NAME}/dist/public ./apps/${PROJECT_NAME}/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME}/dist/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME}/dist/.next/static ./apps/${PROJECT_NAME}/dist/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Convert args to env vars to remain persistent after build
ENV PROJECT_NAME=$PROJECT_NAME
ENV SITE_URL=$SITE_URL
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_ANALYTICS_WRITE_KEY=$NEXT_PUBLIC_ANALYTICS_WRITE_KEY
ENV NEXT_PUBLIC_DOCSEARCH_APP_ID=$NEXT_PUBLIC_DOCSEARCH_APP_ID
ENV NEXT_PUBLIC_DOCSEARCH_API_KEY=$NEXT_PUBLIC_DOCSEARCH_API_KEY
ENV NEXT_PUBLIC_DOCSEARCH_INDEX_NAME=$NEXT_PUBLIC_DOCSEARCH_INDEX_NAME

CMD node apps/${PROJECT_NAME}/server.js