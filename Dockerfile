FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy custom nginx config
COPY --from=build /app/dist /usr/share/nginx/html

# Modify nginx to listen on port 3004 instead of 80
RUN sed -i 's/listen\s*80;/listen 3004;/g' /etc/nginx/conf.d/default.conf

EXPOSE 3004

CMD ["nginx", "-g", "daemon off;"]
