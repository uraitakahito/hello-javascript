## How to launch

```console
% npx mocha
% npx eslint .
% cd examples/express
% npx nodemon app.cjs
```

## How to connect VS Code's debugger to an app or process that's already running

```console
% cd /path/to
% git clone git@github.com:uraitakahito/hello-javascript.git
% cd /path/to/hello-javascript
% PROJECT=$(basename `pwd`)
% echo $PROJECT
hello-javascript
% docker image build -t $PROJECT-image ./.devcontainer --build-arg user_id=`id -u` --build-arg group_id=`id -g`
% cd /path/to
% git clone https://github.com/expressjs/express.git
% cd /path/to/express
% docker run -it --rm -p 3000:3000 -v `pwd`:/app $PROJECT-image /bin/zsh
```

Type in docker:

```console
% cd /app
% npm install
% node examples/content-negotiation
```

1. Select `Dev Containers: Attach to Running Container` through the `Command Palette (Shift + command + P)`
2. Open the `/app`
3. Select `Debug: Attach to Node Process` through the `Command Palette (Shift + command + P)`

## How to run lauch the app in docker

```console
% docker run -it --rm -v `pwd`:/app node sh -c "cd app/examples/fs; node stream.cjs"
```

## version

```console
% npm list -global --depth=0
/usr/local/lib
├── corepack@0.24.0
└── npm@10.2.4

% npm list --depth=0
hello-javascript@1.0.0 /workspaces/hello-javascript
├── ejs@3.1.9
├── eslint-config-google@0.14.0
├── eslint-plugin-mocha@10.2.0
├── eslint@8.56.0
├── express@4.18.2
├── mocha@10.2.0
├── multer@1.4.5-lts.1
├── nodemon@3.0.3
└── path@0.12.7
```
