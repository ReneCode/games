#!/bin/bash

# Set the Docker image name and tag
IMAGE_NAME="game-server"
IMAGE_TAG="latest"

# Build the Docker image
docker build -t "$IMAGE_NAME:$IMAGE_TAG" .

# Optionally, you can also push the image to a Docker registry
# docker push "$IMAGE_NAME:$IMAGE_TAG"