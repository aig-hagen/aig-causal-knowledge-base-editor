#!/bin/bash
set -e

npm install-clean
npm run build
podman build -t aig-hagen/causal-knowledge-base-editor:$(git rev-parse --short HEAD) .