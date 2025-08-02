# Simple Node.js development container
FROM node:18-bullseye

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    zsh \
    sudo \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
ARG USERNAME=node
RUN echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set working directory
WORKDIR /workspaces/munchies

# Switch to non-root user
USER $USERNAME

# Default command
CMD ["sleep", "infinity"]
