# Use official Node.js LTS image as base
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . .

# Explicitly copy plugin and config files
COPY ./src/plugins/codeHeadersPlugin.ts ./src/plugins/codeHeadersPlugin.ts
COPY ./src/plugins/readingTimePlugin.ts ./src/plugins/readingTimePlugin.ts
COPY ./src/theme.config.ts ./src/theme.config.ts

# Build the Astro site
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create necessary directories
RUN mkdir -p /app/src/assets /app/src/plugins /app/src

# Copy build artifacts and necessary files
COPY --from=base /app/dist ./dist
COPY --from=base /app/public ./public
COPY --from=base /app/src/assets ./src/assets
COPY --from=base /app/src/content ./src/content
COPY --from=base /app/src/plugins ./src/plugins
COPY --from=base /app/src/theme.config.ts ./src/theme.config.ts
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/astro.config.ts ./astro.config.ts

# Ensure logo is in the correct location for both Astro and Docker
COPY --from=base /app/src/assets/logo.png /app/src/assets/logo.png
COPY --from=base /app/src/assets/logo.png /src/assets/logo.png

# Install only production dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "preview"]
