# dependencies
FROM node:12.9.1

# copy contents
WORKDIR /usr/src/app
ADD . ./build
ADD ../src/ ./src
COPY ../package.json .
COPY ../package-lock.json .
COPY ../settings.json .
COPY ../tsconfig.json .

# build
RUN npm install \
	&& npm run build

# run-command
CMD ["npm", "run", "run"]