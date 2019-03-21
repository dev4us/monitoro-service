# node Version
FROM node:10.14

# Author
MAINTAINER dev4us <public.dev4us@gmail.com>

# make directory for app
RUN mkdir -p /app

# Set WorkSpace to app directory
WORKDIR /app

# Move all file to app directory
ADD . /app

# Install packages
# RUN npm install

# Set environment
ENV NODE_ENV development

# Set Port for virtual Environment
# EXPOSE 3000 80

# Set Command for Container
CMD ["npm", "start"]
