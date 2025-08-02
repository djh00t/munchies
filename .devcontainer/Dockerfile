# Use the official Node.js image as base
FROM node:18-bullseye

# Install additional packages and tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    zsh \
    sudo \
    build-essential \
    python3 \
    python3-pip \
    postgresql-client \
    redis-tools \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true

# Create a non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configure sudo for the node user
RUN echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set up the user's shell
USER $USERNAME
RUN sudo chsh -s $(which zsh) $USERNAME

# Set the default shell to zsh
ENV SHELL=/usr/bin/zsh

# Configure git safe directory (for when the workspace is mounted)
RUN git config --global --add safe.directory /workspaces/munchies

# Install global npm packages that are useful for development
RUN npm install -g \
    tsx \
    nodemon \
    prisma \
    @types/node \
    typescript \
    eslint \
    prettier

# Set working directory
WORKDIR /workspaces/munchies

# Copy package.json files for dependency installation
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
COPY packages/web/package*.json ./packages/web/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure proper ownership
USER root
RUN chown -R $USERNAME:$USERNAME /workspaces/munchies
USER $USERNAME

# Expose ports
EXPOSE 3000 3001

# Default command
CMD ["zsh"]
