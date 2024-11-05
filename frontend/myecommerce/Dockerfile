# Frontend Dockerfile: myecommerce/frontend/Dockerfile

# Use the official Node.js 22 image as the build stage
FROM node:22 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Production environment
FROM node:22 AS production

# Set the working directory for the production container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install production dependencies only
RUN npm install -g pnpm && pnpm install --prod

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["pnpm", "run", "start"]
