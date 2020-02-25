# dependencies
FROM node:12.9.1

# arguments
ARG buildno

# other dependencies
RUN apt-get update -qq && apt-get install jq -qqy

# copy contents
WORKDIR /usr/src/app
ADD build ./build
ADD src/backend ./src/backend
ADD src/general ./src/general
ADD src/modules ./src/modules
ADD test ./test
COPY package.json .
COPY package-lock.json .
COPY settings.json .
COPY tsconfig.json .

# modifications
RUN tmp=$(mktemp) && jq ".general.home=\"/usr/src/app\"" settings.json > "$tmp" && mv "$tmp" settings.json
RUN tmp=$(mktemp) && jq ".pouchdb.host=\"couchdb\"" settings.json > "$tmp" && mv "$tmp" settings.json
RUN tmp=$(mktemp) && jq ".redis.host=\"redis\"" settings.json > "$tmp" && mv "$tmp" settings.json
RUN tmp=$(mktemp) && jq ".neo4j.host=\"neo4j\"" settings.json > "$tmp" && mv "$tmp" settings.json

# node-dependencies
RUN npm install

# build
RUN mkdir -p src/backend/@build && \
	cp settings.json src/backend/@build/settings.json && \
	npm run backend-prod && \
	npm run parse-settings && \
	npm run backend-prod
# clean


# run-command
ENTRYPOINT ["node", "./dist/backend/bundle.main.js"]