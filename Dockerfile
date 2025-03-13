# Use the official Node.js LTS image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Ensure a fresh install of dependencies inside Docker (correct platform)
RUN rm -rf node_modules package-lock.json && npm install --force

# Install tsx globally to run TypeScript files
RUN npm install -g tsx

# Copy the rest of the application files AFTER dependencies are installed
COPY . .

# Expose port 3000 (for apps running on this port)
EXPOSE 3000

# Default command to start the app
CMD ["npx", "tsx", "src/index.ts"]