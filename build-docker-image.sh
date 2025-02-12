#!/bin/bash
set -e

pnpm install
pnpm build
podman build -t aig-hagen/causal-knowledge-base-editor:$(git rev-parse --short HEAD) .