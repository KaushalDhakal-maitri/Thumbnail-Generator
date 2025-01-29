# Use an official Node.js image (Alpine-based for smaller size)
FROM node:18-alpine



# Install LibreOffice and ImageMagick
RUN apk add --no-cache libreoffice imagemagick

# Set the working directory inside the container
WORKDIR /app

RUN apk add --no-cache \
    ttf-dejavu \
    ttf-liberation \
    fontconfig

RUN apk add --no-cache msttcorefonts-installer && \
    update-ms-fonts && \
    fc-cache -f




# Copy package.json and install dependencies (if needed)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the files into the container
COPY . .

# Create output directory
RUN mkdir -p /app/output

# Set /app/output as a volume (optional, but recommended)
VOLUME [ "/app/output" ]

# Set the command to run the script
CMD ["node", "index.js"]
