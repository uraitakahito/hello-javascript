## How to launch

Build your docker image:

```console
% PROJECT=$(basename `pwd`)
% echo $PROJECT
hello-javascript
% docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```console
% docker container run -it --rm --init -p 3000:3000 -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image /bin/zsh
```

Run the following commands inside the Docker containers:

```console
% cd /app
% npm ci
% npm run test:run
% npx eslint .
% cd examples/express
% npx vitest run
% npx nodemon server.cjs
```

## How to connect VS Code's debugger to an app or process that's already running

```console
% cd /path/to
% git clone git@github.com:uraitakahito/hello-javascript.git
% cd /path/to/hello-javascript
% PROJECT=$(basename `pwd`)
% docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
% cd /path/to
% git clone https://github.com/expressjs/express.git
% cd /path/to/express
% docker container run -it --rm --init -p 3000:3000 -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image /bin/zsh
```

Type in docker:

```console
% cd /app
% npm ci
% node examples/content-negotiation/index.js
```

1. Select `Dev Containers: Attach to Running Container` through the `Command Palette (Shift + command + P)`
2. Open the `/app`
3. Select `Debug: Attach to Node Process` through the `Command Palette (Shift + command + P)`

## How to run the app in docker

```console
% docker run -it --rm -v `pwd`:/app node sh -c "cd app/examples/fs; node stream.cjs"
```
