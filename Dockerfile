# node runtime + base Linux image
FROM node:latest
# create a new directory
RUN mkdir -p /app/src
# set the new directory as the working directory
WORKDIR /app/src
# copy package.json file to the current working directory
COPY package.json .
# install the dependencies
RUN npm install --force
# copy all files to the current working directory
COPY . .
# expose the port to view the app in the browser
EXPOSE 3000
# run npm start to start the app 
#CMD: a default command that gets executed once the Docker Container is run
# IMPORTANT: only one CMD command will be executed. If there are multiple CMD commands, only the last one gets executed
CMD ["npm", "start"]