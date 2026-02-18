# Copyright Red Hat
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Install dependencies only when needed
FROM registry.access.redhat.com/ubi9/nodejs-22-minimal@sha256:ff6a2fec646bbc42f67a48753206fd5dd785aab3e6ab2f611afaba2514f1d39d AS deps
USER root

# Install corepack & node-gyp dependency
RUN microdnf install -y python3 gcc-c++ make && \
  npm install --build-from-resource node-gyp && \
  npm install -g corepack

# Install yarn v4
RUN corepack install -g yarn@4

# Project non-specific args
ARG PROJECT_NAME
ARG SITE_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_ANALYTICS_WRITE_KEY

# Landing page specific args
ARG NEXT_PUBLIC_DOCSEARCH_APP_ID
ARG NEXT_PUBLIC_DOCSEARCH_API_KEY
ARG NEXT_PUBLIC_DOCSEARCH_INDEX_NAME

# Building different architectures via emulation is slow with Yarn
# This increases the timeout period so it can properly download dependencies
# Value is in milliseconds and is set to 60 minutes
# To increase/decrease you can override via --build-arg YARN_TIMEOUT=x in your build command
ARG YARN_HTTP_TIMEOUT=3600000

# Check if the PROJECT_NAME build argument is set
RUN \
  if [ "$PROJECT_NAME" == "landing-page" ] || [ "$PROJECT_NAME" == "registry-viewer" ]; then echo "Building project \"${PROJECT_NAME}\"."; \
  else echo "Build argument \"PROJECT_NAME\" needs to be set to either \"landing-page\" or \"registry-viewer\"." && exit 1; \
  fi
WORKDIR /app

# Install dependencies
COPY package.json .yarnrc.yml yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --immutable; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM registry.access.redhat.com/ubi9/nodejs-22-minimal@sha256:ff6a2fec646bbc42f67a48753206fd5dd785aab3e6ab2f611afaba2514f1d39d AS builder
USER root

# Install corepack
RUN npm install -g corepack

# Install yarn v4
RUN corepack install -g yarn@4

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

RUN yarn nx build ${PROJECT_NAME} --skip-nx-cache

# Production image, copy all the files and run next
FROM registry.access.redhat.com/ubi9/nodejs-22-minimal@sha256:ff6a2fec646bbc42f67a48753206fd5dd785aab3e6ab2f611afaba2514f1d39d AS runner
USER root

# Install shadow-utils to use groupadd and useradd
RUN microdnf install shadow-utils -y

# Install react-env to update environment variables during runtime
RUN npm install -g @beam-australia/react-env

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

RUN useradd nextjs -u 1001

COPY --from=builder --chown=nextjs:0 /app/apps/${PROJECT_NAME}/dist/public ./apps/${PROJECT_NAME}/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:0 /app/apps/${PROJECT_NAME}/dist/.next/standalone ./
COPY --from=builder --chown=nextjs:0 /app/apps/${PROJECT_NAME}/dist/.next/static ./apps/${PROJECT_NAME}/dist/.next/static

RUN chown -R 1001:0 ./apps/${PROJECT_NAME} && chmod -R g=u ./apps/${PROJECT_NAME}

# Add license
RUN mkdir -p /licenses
COPY LICENSE /licenses

USER 1001

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

ENTRYPOINT react-env --prefix NEXT_PUBLIC --dest apps/${PROJECT_NAME}/public --path .env.production && \
  node apps/${PROJECT_NAME}/server.js
