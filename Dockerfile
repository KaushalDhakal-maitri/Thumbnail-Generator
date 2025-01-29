FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json ./

# Install dependencies for LibreOffice
RUN apk update && apk add --no-cache \
    bash \
    libc6-compat \
    libreoffice \
    imagemagick \
    && rm -rf /var/cache/apk/*


RUN npm install

COPY . ./

CMD ["node", "index.js"]

