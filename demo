# Use the official Node.js 20 Alpine image as the builder stage
FROM node:20-alpine AS builder

# Set the working directory inside the container to /build
WORKDIR /build

# Copy the package.json file to the working directory
COPY package.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx Alpine image as the runner stage
FROM nginx:alpine AS runner

# Copy the built application from the builder stage to the Nginx html directory
COPY --from=builder /build/dist /usr/share/nginx/html

# Expose port 80 to allow traffic to the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
