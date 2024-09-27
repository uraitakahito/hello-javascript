## How to launch

Build your docker image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run -it --rm --init -p 3000:3000 -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --mount type=bind,src=$HOME/.gitconfig,dst=/home/developer/.gitconfig --name $PROJECT-container $PROJECT-image /bin/zsh
```

Run the following commands inside the Docker containers:

```sh
npm ci
npm run test:run
npx eslint .
npx vitest run
npx vitest run --project node
```

## How to connect VS Code's debugger to an other app

```sh
git clone git@github.com:uraitakahito/hello-javascript.git
cd /path/to/hello-javascript
PROJECT=$(basename `pwd`)
docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
cd /path/to
git clone https://github.com/expressjs/express.git
cd /path/to/express
docker container run -it --rm --init -p 3000:3000 -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image /bin/zsh
```

Type in docker:

```sh
npm ci
node examples/content-negotiation/index.js
```

1. Select `Dev Containers: Attach to Running Container` through the `Command Palette (Shift + command + P)`
2. Open the `/app`
3. Select `Debug: Attach to Node Process` through the `Command Palette (Shift + command + P)`

## How to run the app in docker

```sh
docker run -it --rm -v `pwd`:/app node sh -c "cd app/examples/fs; node stream.cjs"
```
