# Step 1: Build the application
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
# Or if you use yarn, copy yarn files
# COPY package.json yarn.lock ./

# Install dependencies
RUN npm install
# Or if you use yarn, run yarn install
# RUN yarn install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build
# Or if you use yarn, run yarn build
# RUN yarn build

# Step 2: Serve the application from Nginx
FROM nginx:stable-alpine

# Copy built assets from 'build' stage to Nginx's serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
