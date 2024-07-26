# Use the official Python image as the base image for the backend
FROM python:3.10-slim AS backend

# Set the working directory for the backend
WORKDIR /app

# Copy the requirements file into the container
COPY model/requirements.txt .

# Install the required Python packages
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the backend source code into the container
COPY model .

# Build the frontend
FROM node:14 AS frontend

# Set the working directory for the frontend
WORKDIR /app/casset

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the frontend source code into the container
COPY src ./src
COPY public ./public

# Build the frontend
RUN npm run build

# Final stage: combining backend and frontend
FROM python:3.10-slim

# Set the working directory for the final image
WORKDIR /app

# Copy the backend code from the backend build stage
COPY --from=backend /app /app

# Copy the frontend build from the frontend build stage
COPY --from=frontend /app/casset/build /app/static

# Install the required Python packages in the final image
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose the port that your Flask app listens on
EXPOSE 5000

# Run Gunicorn to serve the app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
