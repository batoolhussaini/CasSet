# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your Flask app listens on
EXPOSE 5000

# Run Gunicorn to serve the app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]