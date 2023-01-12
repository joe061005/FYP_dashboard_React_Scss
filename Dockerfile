# Stage 1
# Build docker image of react app
FROM node:16 as build-stage
# set working directory
RUN mkdir /usr/app
# copy all files from current directory to docker
COPY . /usr/app

WORKDIR /usr/app

# install and cache app dependencies
RUN yarn

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm run build

# Stage 2
# Copy the react app build above in nginx
FROM nginx:alpine

# set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /usr/app/build .

# Containers run nginx with global directives and daemon off 
# daemon off: let nginx stay in the foreground so that Docker can track the process properly
CMD ["nginx", "-g", "daemon off;"]

# # node runtime + base Linux image
# FROM node:16
# # create a new directory
# RUN mkdir -p /app/src
# # set the new directory as the working directory
# WORKDIR /app/src
# # copy package.json file to the current working directory
# COPY package.json .
# # install the dependencies
# RUN npm install --force
# # copy all files to the current working directory
# COPY . .
# # expose the port to view the app in the browser
# EXPOSE 3000
# # run npm start to start the app 
# #CMD: a default command that gets executed once the Docker Container is run
# # IMPORTANT: only one CMD command will be executed. If there are multiple CMD commands, only the last one gets executed
# CMD ["npm", "start"]