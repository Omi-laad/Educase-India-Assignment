# Educase-India-Assignment

# School Management API

This project provides a set of RESTful APIs built using **Node.js**, **Express.js**, and **MySQL** for managing school data. Users can **add new schools** and **retrieve a list of schools** sorted by proximity to a specified location.

## Features

- **Add a School**: Store school details in a MySQL database.
- **List Schools**: Fetch schools sorted by proximity.
- **Get School by ID**: Retrieve details of a specific school.
- **Delete School by ID**: Remove a school from the database.
- **Delete All Schools**: Remove all school records.

## Database Setup

### Table: `schools`

| Column      | Type         | Constraints                 |
| ----------- | ------------ | --------------------------- |
| `id`        | INT          | Primary Key, Auto Increment |
| `name`      | VARCHAR(255) | Not Null                    |
| `address`   | VARCHAR(255) | Not Null                    |
| `latitude`  | FLOAT        | Not Null                    |
| `longitude` | FLOAT        | Not Null                    |

## API Endpoints

### 1. **Add a School**

- **Endpoint**: `api/addSchool`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "ABC School",
    "address": "123 Street, City",
    "latitude": 19.076,
    "longitude": 72.8777
  }
  ```
- **Response**:
  ```json
  {
    "message": "School added successfully!",
    "school": {
      "id": 1,
      "name": "ABC School",
      "address": "123 Street, City",
      "latitude": 19.076,
      "longitude": 72.8777
    }
  }
  ```

### 2. **List Schools by Proximity**

- **Endpoint**: `api/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  ```json
  {
    "latitude": 19.076,
    "longitude": 72.8777
  }
  ```
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "ABC School",
      "address": "123 Street, City",
      "latitude": 19.076,
      "longitude": 72.8777
    }
  ]
  ```

### 3. **Get School by ID**

- **Endpoint**: `api/getSchool/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 Street, City",
    "latitude": 19.076,
    "longitude": 72.8777
  }
  ```

### 4. **Delete School by ID**

- **Endpoint**: `api/deleteSchool/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  { "message": "School deleted successfully." }
  ```

### 5. **Delete All Schools**

- **Endpoint**: `api/deleteAllSchools`
- **Method**: `DELETE`
- **Response**:
  ```json
  { "message": "All schools deleted successfully." }
  ```

## Deployment on Railway

1. **Create a MySQL database on Railway**:
   - Go to **Railway.app** → Create a new project.
   - Select **MySQL** as a service.
   - Copy the **connection string** (e.g., `mysql://USER:PASSWORD@HOST:PORT/DATABASE`).
2. **Update your `.env` file**:

   ```env
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   PORT=your-app-port
   ```

3. **Deploy your Node.js app**:
   - Push your code to GitHub.
   - Connect Railway to your GitHub repository.
   - Set up environment variables in Railway.
   - Deploy the project.

## Postman Collection

A **Postman collection** has been created for testing these APIs.

- Import the collection into **Postman**.
- Use the provided sample requests and responses.
- Make requests to your deployed API on **Railway**.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Hosting**: Railway

## License

This project is open-source under the MIT license.
