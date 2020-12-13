FROM node

WORKDIR /app

COPY "package.json" "/app/"

RUN npm install

COPY . /app

EXPOSE 80

# Not correct login for mongo, but will override in run command (for practice)
ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

# use nodemon in start script
CMD ["npm", "start"]