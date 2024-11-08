# Backend Dockerfile: myecommerce/backend/Dockerfile

# Use the official Node.js 22 image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Set the environment to development during the build
ENV NODE_ENV=development

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run your app in development mode
CMD ["npm", "run", "dev"]
