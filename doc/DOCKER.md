Build your docker image:

```bash
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

Run the Docker container:

```bash
docker container run -d --rm --init --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image
```

Use [fdshell](https://github.com/uraitakahito/dotfiles/blob/37c4142038c658c468ade085cbc8883ba0ce1cc3/zsh/myzshrc#L93-L101) to log in to Docker.

```console
% fdshell /bin/zsh
```

Run the following commands inside the Docker containers as needed:

```sh
npm ci
npx eslint .
```

## How to run the app in docker

```sh
docker run -it --rm -v `pwd`:/app node sh -c "cd app/examples/fs; node stream.cjs"
```

## How to use VSCode with Docker

Select **[Dev Containers: Attach to Running Container](https://code.visualstudio.com/docs/devcontainers/attach-container#_attach-to-a-docker-container)** through the **Command Palette (Shift + Command + p)**

Finally, open the `/app`.
