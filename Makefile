bin/docker-blinkt: src/loader.ts
	bash build/build.sh
	CONTAINER_ID=docker run $DOCKER_REGISTRY/docker-blinkt:latest
	docker cp $CONTAINER_ID:/usr/src/app/bin/docker-blinkt ./bin/docker-blinkt