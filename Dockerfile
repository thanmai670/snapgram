# Step 1: Build the application
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Declare build-time environment variables
ARG VITE_APPWRITE_PROJECT_ID
ARG VITE_APPWRITE_URL
ARG VITE_APPWRITE_STORAGE_ID
ARG VITE_APPWRITE_DATABASE_ID
ARG VITE_APPWRITE_SAVES_COLLECTION_ID
ARG VITE_APPWRITE_POSTS_COLLECTION_ID
ARG VITE_APPWRITE_USERS_COLLECTION_ID

# Set environment variables for the build stage
ENV VITE_APPWRITE_PROJECT_ID=$VITE_APPWRITE_PROJECT_ID \
    VITE_APPWRITE_URL=$VITE_APPWRITE_URL \
    VITE_APPWRITE_STORAGE_ID=$VITE_APPWRITE_STORAGE_ID \
    VITE_APPWRITE_DATABASE_ID=$VITE_APPWRITE_DATABASE_ID \
    VITE_APPWRITE_SAVES_COLLECTION_ID=$VITE_APPWRITE_SAVES_COLLECTION_ID \
    VITE_APPWRITE_POSTS_COLLECTION_ID=$VITE_APPWRITE_POSTS_COLLECTION_ID \
    VITE_APPWRITE_USERS_COLLECTION_ID=$VITE_APPWRITE_USERS_COLLECTION_ID

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the application from Nginx
FROM nginx:stable-alpine

# Copy built assets from 'build' stage to Nginx's serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
