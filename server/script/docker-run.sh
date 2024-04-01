#!/bin/bash

docker rm game-server

# Run the Docker container
docker run -d --name  game-server -p 8080:8080 game-server:latest

# Additional commands or configurations can be added here


