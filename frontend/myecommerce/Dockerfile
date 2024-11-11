# Use the official Node.js 20 image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]