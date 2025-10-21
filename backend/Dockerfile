# =================================================================
# == STAGE 1: BUILDER
# =================================================================
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# =================================================================
# == STAGE 2: PRODUCTION
# =================================================================
FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Copy build artifacts from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma

# --- THIS IS THE NEW PART ---
# Copy the start script from the builder stage
COPY --from=builder /app/start-prod.sh .
# Make sure the script is executable inside the container
RUN chmod +x ./start-prod.sh

# Copy the SSL certificate into the final image
COPY --from=builder /app/certs ./certs

EXPOSE 5000

# --- THIS IS THE FINAL CMD ---
# Run the start script. This is the container's entrypoint.
CMD ["./start-prod.sh"]