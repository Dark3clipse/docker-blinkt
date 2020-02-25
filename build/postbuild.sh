#!/bin/bash

# build binary
APP_NAME_L=docker-blinkt
mkdir -p ./bin
touch "./bin/$APP_NAME_L"
truncate -s 0 "./bin/$APP_NAME_L"
VAR1="$(pwd)"
printf 'node %s/dist/bundle.main.js "$@"' "${VAR1}" > "./bin/$APP_NAME_L"
chmod +x -R ./bin
echo "application binary built"