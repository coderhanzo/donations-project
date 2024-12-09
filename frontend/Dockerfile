# Use Node.js LTS version
FROM node:18 AS build

WORKDIR /app

# Copy package files first
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Clear cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application code
COPY ./frontend . 

# Run the build step
RUN npm run build

CMD ["npm", "start"]
