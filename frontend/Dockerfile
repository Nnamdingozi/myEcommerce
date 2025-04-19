# Use the official Node.js 20 image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application using npm
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application using npm
CMD ["npm", "start"]
