# Step 1: Use a base image with Node.js
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Step 4: Copy the source code
COPY . .

# Step 5: Build the React app (production build)
RUN npm run build

# Step 6: Serve the app using a lightweight server
RUN npm install -g serve
CMD ["npm", "run", "dev"]

# Expose port 30007
EXPOSE 5173
