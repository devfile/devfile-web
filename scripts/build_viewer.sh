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

#!/usr/bin/env bash
shopt -s expand_aliases
set -eux

ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR=$ABSOLUTE_PATH/..

# Set Docker/Podman alias if necessary
. ${ABSOLUTE_PATH}/setenv.sh

docker build --no-cache -t registry-viewer $BUILD_DIR \
    --build-arg PROJECT_NAME=registry-viewer \
    --build-arg NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH:-"/viewer"}
