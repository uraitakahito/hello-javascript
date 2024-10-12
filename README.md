Build your docker image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run -d --rm --init -p 3000:3000 -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --mount type=bind,src=$HOME/.gitconfig,dst=/home/developer/.gitconfig --name $PROJECT-container $PROJECT-image
```

Run any commands inside the Docker containers as needed:

```sh
npm ci
npm run test:jest:run
npx eslint .
npx vitest run
npx vitest run --project node
```

## How to run the app in docker

```sh
docker run -it --rm -v `pwd`:/app node sh -c "cd app/examples/fs; node stream.cjs"
```
