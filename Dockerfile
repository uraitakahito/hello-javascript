# Features of this Dockerfile
#
# - Not based on devcontainer; use by attaching VSCode to the container
# - Claude Code is pre-installed
# - Includes dotfiles and extra utilities
# - Assumes host OS is Mac
# - Passes the GH_TOKEN environment variable into the container
#
# Build the Docker image:
#
#   PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg TZ=Asia/Tokyo --build-arg user_id=`id -u` --build-arg group_id=`id -g`
#
# (First time only) Create a volume for command history:
#
# Create a volume to persist the command history executed inside the Docker container.
# It is stored in the volume because the dotfiles configuration redirects the shell history there.
#   https://github.com/uraitakahito/dotfiles/blob/b80664a2735b0442ead639a9d38cdbe040b81ab0/zsh/myzshrc#L298-L305
#
#   docker volume create $PROJECT-zsh-history
#
# Start the Docker container(/run/host-services/ssh-auth.sock is a virtual socket provided by Docker Desktop for Mac.):
#
#   docker container run -d --rm --init -v /run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock -e SSH_AUTH_SOCK=/run/host-services/ssh-auth.sock -e GH_TOKEN=$(gh auth token) --mount type=bind,src=`pwd`,dst=/app --mount type=volume,source=$PROJECT-zsh-history,target=/zsh-volume --name $PROJECT-container $PROJECT-image
#
# Log into the container.
#
#   OR
#
# Connect from Visual Studio Code:
#
# 1. Open **Command Palette (Shift + Command + p)**
# 2. Select **Dev Containers: Attach to Running Container**
# 3. Open the `/app` directory
#
# For details:
#   https://code.visualstudio.com/docs/devcontainers/attach-container#_attach-to-a-docker-container
#
# (First time only) change the owner of the command history folder:
#
#   sudo chown -R $(id -u):$(id -g) /zsh-volume
#
# Run the following commands inside the Docker containers as needed:
#
# ```sh
# npm ci
# ```
#

# Debian 12.13
FROM debian:bookworm-20260202

ARG user_name=developer
ARG user_id
ARG group_id
ARG dotfiles_repository="https://github.com/uraitakahito/dotfiles.git"
ARG features_repository="https://github.com/uraitakahito/features.git"
ARG extra_utils_repository="https://github.com/uraitakahito/extra-utils.git"
# Refer to the following URL for Node.js versions:
#   https://nodejs.org/en/about/previous-releases
ARG node_version="24.12.0"

ARG LANG=C.UTF-8
ENV LANG="$LANG"
ARG TZ=UTC
ENV TZ="$TZ"

#
# Git
#
RUN apt-get update -qq && \
  apt-get install -y -qq --no-install-recommends \
    ca-certificates \
    git && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

#
# clone features
#
RUN cd /usr/src && \
  git clone --depth 1 ${features_repository}

#
# Add user and install common utils.
#
# For the list of installed packages, see:
#   https://github.com/uraitakahito/features/blob/deb6cf416fda206b99c7b771e9caa12e6952f9c7/src/common-utils/main.sh#L35-L78
#
RUN USERNAME=${user_name} \
    USERUID=${user_id} \
    USERGID=${group_id} \
    CONFIGUREZSHASDEFAULTSHELL=true \
    UPGRADEPACKAGES=false \
    # When using ssh-agent inside Docker, add the user to the root group
    # to ensure permission to access the mounted socket.
    #   https://github.com/uraitakahito/features/blob/59e8acea74ff0accd5c2c6f98ede1191a9e3b2aa/src/common-utils/main.sh#L467-L471
    ADDUSERTOROOTGROUP=true \
      /usr/src/features/src/common-utils/install.sh

#
# Install extra utils.
#
RUN cd /usr/src && \
  git clone --depth 1 ${extra_utils_repository} && \
  UPGRADEPACKAGES=false \
  ADDEZA=true \
  ADDGRPCURL=true \
  ADDCLAUDECODE=true \
  # Claude Code is installed under $HOME, so the username must be specified.
  USERNAME=${user_name} \
    /usr/src/extra-utils/utils/install.sh

#
# Install Node
#   https://github.com/uraitakahito/features/blob/develop/src/node/install.sh
#
RUN INSTALLYARNUSINGAPT=false \
    NVMVERSION="latest" \
    PNPM_VERSION="none" \
    USERNAME=${user_name} \
    VERSION=${node_version} \
      /usr/src/features/src/node/install.sh

COPY docker-entrypoint.sh /usr/local/bin/

USER ${user_name}

#
# dotfiles
#
RUN cd /home/${user_name} && \
  git clone --depth 1 ${dotfiles_repository} && \
  dotfiles/install.sh

# express server
EXPOSE 3000

WORKDIR /app
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["tail", "-F", "/dev/null"]
