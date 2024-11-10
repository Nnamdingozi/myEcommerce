# Use the official Node.js 22 image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Set the environment to production during the build
ENV NODE_ENV=production

# Install only production dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run migrations and seeding when starting the container
CMD ["npm", "start"]
