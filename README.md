Type:

```console
% npx mocha
% npx eslint .
% cd examples/express
% npx nodemon app.cjs
```

or

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
