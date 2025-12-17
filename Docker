# Use official Node image
FROM node:18-alpine

# Set working directory in container
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app code
COPY . .

# Expose the port your Express app listens on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
