FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3009
EXPOSE 3009 

# Explicitly set the listening port in the Nginx config
RUN sed -i 's/listen       80;/listen       3009;/' /etc/nginx/conf.d/default.conf