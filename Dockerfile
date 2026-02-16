FROM node:18-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache ffmpeg python3 make g++

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create session directory
RUN mkdir -p session

# Start bot
CMD ["npm", "start"]
