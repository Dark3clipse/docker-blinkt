bin/docker-blinkt: src/loader.ts
	docker build ./build -t build_docker-blinkt
	CONTAINER_ID=docker run build_docker-blinkt
	docker exec $CONTAINER_ID npm run docker-build
	docker cp $CONTAINER_ID:/usr/src/app/bin/docker-blinkt ./bin/docker-blinkt