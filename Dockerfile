# Dockerfile

# Set the base image
FROM node:16

# Specify a working directory
WORKDIR /usr/src/app

# Copy your package.json and package-lock.json files
COPY package*.json ./

# If you have common parts in the project root
#COPY ./common ./common
COPY ./concepts ./concepts
COPY ./data ./data

# Copy your backend folder and install only the production dependencies
COPY ./backend ./backend
RUN cd backend && npm install --only=prod --omit=dev
#CMD [ "npm", "run", "prodDeps" ]
# If you are building your code for production
# Run 'npm run buildFront' inside the Docker container
#RUN cd frontend && npm run build

# Inform Docker that the container is going to listen on the specified port
#EXPOSE 5000
EXPOSE 5000
EXPOSE 3000

# Define the command that should be executed
# 'npm start' runs your application
CMD [ "npm", "start" ]