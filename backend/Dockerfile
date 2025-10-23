# =================================================================
# == STAGE 1: BUILDER - Creates a complete, working application
# =================================================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install ALL dependencies, including devDependencies
RUN npm install

# Copy the entire source code
COPY . .

# Generate the Prisma Client with ALL required binary targets
RUN npx prisma generate

# Build the TypeScript code into JavaScript
RUN npm run build


# =================================================================
# == STAGE 2: PRODUCTION - Assembles the final image
# =================================================================
FROM node:22-alpine AS production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# --- THE CRITICAL FIX ---
# Instead of copying individual pieces, copy the ENTIRE `node_modules`
# from the builder. This guarantees that the generated query engines are included.
COPY --from=builder /app/node_modules ./node_modules

# Copy the compiled application code
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

# Copy the start script
COPY --from=builder /app/start-prod.sh .
RUN chmod +x ./start-prod.sh

EXPOSE 5000

CMD ["./start-prod.sh"]