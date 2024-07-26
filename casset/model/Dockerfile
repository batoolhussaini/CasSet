# Use the official Python image as the base image
FROM python:3.10-slim AS backend

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the backend code into the container
COPY . .

# Build the frontend
FROM node:14 AS frontend

WORKDIR /app/casset

COPY casset/package.json casset/package-lock.json ./

RUN npm install

COPY ../casset .

RUN npm run build

# Final stage: combining backend and frontend
FROM python:3.10-slim

WORKDIR /app

# Copy the backend code
COPY --from=backend /app /app

# Copy the frontend build
COPY --from=frontend /app/casset/build /app/static

# Install the required Python packages
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose the port that your Flask app listens on
EXPOSE 5000

# Run Gunicorn to serve the app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
