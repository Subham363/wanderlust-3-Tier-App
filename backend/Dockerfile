# Stage 1
FROM node:21 

# setup the working dir
WORKDIR /app

# code
COPY . .

# packages install
RUN npm i

# setup the working dir
WORKDIR /app

COPY .env.sample .env

# Port
EXPOSE 5000

# CMD 
CMD ["npm", "start"]
