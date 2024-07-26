#PART 1: Build the backend (official Python image as the base image for the backend)
FROM python:3.10-slim AS backend
# working directory for the backend
WORKDIR /app
# copy requirements file into the container
COPY model/requirements.txt .
# install required Python packages
RUN pip install --upgrade pip && pip install -r requirements.txt
# copy backend source code into the container
COPY model .

#PART 2: Build the frontend
FROM node:14 AS frontend
# working directory for the frontend
WORKDIR /app/casset
# copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./
# install Node.js dependencies
RUN npm install
# copy frontend source code into the container
COPY src ./src
COPY public ./public
# build 
RUN npm run build

#PART 3: Combining backend and frontend
FROM python:3.10-slim
# working directory for the final image
WORKDIR /app
# copy backend code from the backend build stage (pt. 1)
COPY --from=backend /app /app
# copy frontend build from the frontend build stage (pt. 2)
COPY --from=frontend /app/casset/build /app/build
# install required Python packages in the final image
RUN pip install --upgrade pip && pip install -r requirements.txt

# expose the port that your Flask app listens on
EXPOSE 5000

# run Gunicorn to serve the app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
