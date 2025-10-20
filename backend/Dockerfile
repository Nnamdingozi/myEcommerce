
# =================================================================
# == STAGE 1: BUILDER - Installs all deps, generates client, and builds the app
# =================================================================
# Use a specific version for reproducible builds
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install ALL dependencies, including devDependencies needed for Prisma and TypeScript
RUN npm install

# Now, copy the entire source code, including the `prisma` folder
COPY . .

# Generate the Prisma Client. This will now succeed because `schema.prisma` exists
# and `prisma` was installed as a devDependency.
RUN npx prisma generate

# Build the TypeScript code into JavaScript in the /dist folder
RUN npm run build


# =================================================================
# == STAGE 2: PRODUCTION - Creates the final, lean image
# =================================================================
# Start from a fresh, clean Node.js image
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ONLY production dependencies to keep the image small
RUN npm install --production

# Copy the built application code from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Copy the generated Prisma Client from the 'builder' stage. This is essential.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy the prisma schema file. This is required by the Prisma Client at runtime.
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma

# Expose the port your application runs on
EXPOSE 5000

# The command to start the application
CMD ["npm", "run", "start"]