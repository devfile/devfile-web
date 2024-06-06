#!/bin/sh

#
# Copyright Red Hat
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR=$ABSOLUTE_PATH/..
# Due to command differences between podman and docker we need to separate the process
# for creating and adding images to a multi-arch manifest
podman=${USE_PODMAN:-false}
# Base Repository
BASE_REPO="quay.io/devfile/registry-viewer"
BASE_TAG="next"
DEFAULT_IMG="$BASE_REPO:$BASE_TAG"
# Platforms to build for
PLATFORMS="linux/amd64,linux/arm64"

if [ ${podman} == true ]; then
  echo "Executing with podman"

  podman manifest create "$DEFAULT_IMG"

  podman build --platform="$PLATFORMS" --manifest "$DEFAULT_IMG" "$BUILD_DIR" \
  --no-cache \
  --build-arg PROJECT_NAME=registry-viewer \
  --build-arg NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH:-"/viewer"}

  podman manifest push "$DEFAULT_IMG"

  podman manifest rm "$DEFAULT_IMG"

else
  echo "Executing with docker"

  docker buildx create --name registry-viewer-builder

  docker buildx use registry-viewer-builder

  docker buildx build --push --platform="$PLATFORMS" --tag "$DEFAULT_IMG" "$BUILD_DIR" \
  --no-cache \
  --provenance=false \
  --build-arg PROJECT_NAME=registry-viewer \
  --build-arg NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH:-"/viewer"}

  docker buildx rm registry-viewer-builder

fi