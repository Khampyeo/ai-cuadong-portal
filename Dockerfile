# Use the official Node.js 18.x image as base (once available)
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js is running on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
