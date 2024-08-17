# Use Node.js base image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
