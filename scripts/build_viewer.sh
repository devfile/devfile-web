# Copyright 2022 Red Hat, Inc.
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

#!/usr/bin/env bash

docker build -t registry-viewer . \
    --build-arg PROJECT_NAME=registry-viewer \
    --build-arg SITE_URL=${SITE_URL:-"https://registry.stage.devfile.io/viewer"} \
    --build-arg NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH:-"/viewer"} \
    --build-arg NEXT_PUBLIC_ANALYTICS_WRITE_KEY=${NEXT_PUBLIC_ANALYTICS_WRITE_KEY:-""}
