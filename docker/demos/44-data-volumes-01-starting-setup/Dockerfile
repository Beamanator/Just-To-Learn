FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# Note: same as adding `-v /app/feedback` in run command
# VOLUME [ "/app/feedback" ]
# Added to override bind mount set at `/app` path, so that
# -> the node_modules folder from image is copied into our container(s)
# VOLUME [ "/app/node_modules" ]

# CMD ["node", "server.js"]
CMD ["npm", "start"]