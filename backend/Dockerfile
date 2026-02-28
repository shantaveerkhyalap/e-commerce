#FROM node:18 AS builder

#WORKDIR /app

#COPY package*.json ./

#RUN npm ci 

#COPY . .
 
#RUN npm run build 

# stage 2: serve app with nginx server

#FROM node:18-alpine

#WORKDIR /app
#RUN apk add --no-cache curl

#COPY package*.json ./
#RUN npm ci --omit=dev
#COPY --from=builder /app/dist ./dist

#CMD ["node", "dist/server.js"]

#--------------------------------------------

FROM node:20-alpine

WORKDIR /app

# install curl for healthcheck
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 8006

CMD ["node", "app.js"]