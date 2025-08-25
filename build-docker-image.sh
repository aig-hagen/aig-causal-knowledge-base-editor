#!/bin/bash
set -e

# npm install-clean
# npm run build

cp ./dist/index.html ./dist/index.html.bak
trap 'mv ./dist/index.html.bak ./dist/index.html' EXIT
sed -i "s|\$TWEETY_API_URL||g" ./dist/index.html

podman build -t aig-hagen/causal-knowledge-base-editor:$(git rev-parse --short HEAD) .