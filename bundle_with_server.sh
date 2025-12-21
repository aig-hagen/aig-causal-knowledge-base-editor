#!/bin/bash

set -e

: "${RUNNER_TEMP:=$PWD}"
ORIGINAL_JAR="${RUNNER_TEMP}/org.tweetyproject.web.jar"
UNZIPED_JAR="${RUNNER_TEMP}/org.tweetyproject.web"
MODIFIED_JAR="${RUNNER_TEMP}/org.tweetyproject.web-with-causal-knowledge-base-editor.jar"

TWEETY_VERSION=$(grep -Po '(?<=:).+(?=@)' Dockerfile)
JAR_URL="https://github.com/odzhychko/TweetyProject/releases/download/v${TWEETY_VERSION}/web-${TWEETY_VERSION}.jar"
wget -O "$ORIGINAL_JAR" "$JAR_URL"
unzip "$ORIGINAL_JAR" -d "$UNZIPED_JAR"
cp -r ./dist/ "${UNZIPED_JAR}/BOOT-INF/classes/static/"
# JARs inside the JAR are not allowed to be compressed again
(cd "$UNZIPED_JAR"; zip -r "$MODIFIED_JAR" . -x "BOOT-INF/lib/*.jar" && zip -0 "$MODIFIED_JAR" BOOT-INF/lib/*.jar)