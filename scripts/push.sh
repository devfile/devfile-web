#!/usr/bin/env bash

BASE_TAG=$1
IMAGE_TAG=$2
docker tag $BASE_TAG $IMAGE_TAG
docker push $IMAGE_TAG
