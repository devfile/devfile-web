#!/usr/bin/env bash

regex="\.\/apps\/([^\/]*)\/dist\/exported"
find ./apps -type d -name "exported" |
  while read dir; do if [[ $dir =~ $regex ]]; then
    mkdir -p ./build/${BASH_REMATCH[1]}/
    cp -r $dir/. $_
  fi; done
