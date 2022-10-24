#!/usr/bin/env bash

docker build -t registry-viewer . \
    --build-arg PROJECT_NAME=registry-viewer \
    --build-arg NEXT_PUBLIC_BASE_PATH=/viewer \
    --build-arg NEXT_PUBLIC_DEVFILE_REGISTRIES="${NEXT_PUBLIC_DEVFILE_REGISTRIES:-""}" \
    --build-arg NEXT_PUBLIC_ANALYTICS_WRITE_KEY=${NEXT_PUBLIC_ANALYTICS_WRITE_KEY:-""}
