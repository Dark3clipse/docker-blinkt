#!/bin/bash

# configure application prior to build
if test -f ".env"; then
  export $(cat .env | xargs)
fi


# fix volume mount paths in DiD scenario
if test -f "~/docker-entrypoint.sh"; then
    echo "Docker-in-docker detected!"
#    echo "Converting paths relative to this container to paths relative to host container based on TBL_HOST_WORKSPACE environment variable"
#    ABS_PATH_DIST="$TBL_HOST_WORKSPACE/$(echo $WORKSPACE | sed 's/\/workspace\//|/g' | cut -d'|' -f2)/dist"
#    sed -i "s#../dist#$ABS_PATH_DIST#g" build/docker-compose.yml
#    echo "paths replaced in docker-compose.yml!"
fi

# replace set docker image registry location
sed -i "s#image: .*docker-blinkt#image: $DOCKER_REGISTRY/docker-blinkt#g" build/docker-compose.yml

# build image
docker build -t $DOCKER_REGISTRY/docker-blinkt:latest build

# push image to registry
docker push $DOCKER_REGISTRY/docker-blinkt:latest

exit 0