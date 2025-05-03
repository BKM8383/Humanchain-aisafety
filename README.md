# HumanChain AI Safety Incident Log API

A Spring Boot application for logging and managing AI safety incidents, developed as part of a take-home assignment for Sparklehood.

**Live Demo:** [https://ai-safety-incident-log.onrender.com/](https://ai-safety-incident-log.onrender.com/)

## Table of Contents

* [Technology Stack](#technology-stack)
* [Features](#features)
* [Local Setup](#local-setup)

  * [Prerequisites](#prerequisites)
  * [Database Setup](#database-setup)
  * [Building and Running](#building-and-running)
  * [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)
* [Database Schema](#database-schema)
* [Design Decisions and Challenges](#design-decisions-and-challenges)

## Technology Stack

* **Backend:** Java 17 with Spring Boot 3.2.0
* **Database:** PostgreSQL (Production), H2 (Development)
* **Build Tool:** Maven
* **Frontend:** HTML, CSS (Bootstrap 5), JavaScript (Axios)

## Features

* RESTful API for managing AI safety incidents
* CRUD operations for incident management
* Data validation and error handling
* Beautiful and responsive UI
* Database persistence

## Local Setup

### Prerequisites

* Java Development Kit (JDK) 17 or higher
* Maven 3.6 or higher
* PostgreSQL (optional for local development since H2 is configured)
* Git

### Database Setup

The application uses H2 in-memory database for development and PostgreSQL for production.

#### Development (H2 Database)

No additional setup required. The application will create an in-memory H2 database when run locally.

#### Production (PostgreSQL)

1. Install PostgreSQL if you don't have it
2. Create a new database:

   ```sql
   CREATE DATABASE aisafety;
   ```
3. Create a user and grant privileges:

   ```sql
   CREATE USER aisafety_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE aisafety TO aisafety_user;
   ```

## Building and Running

1. Clone the repository:

   ```bash
   git clone https://github.com/BKM8383/HumanChain-aisafety.git
   cd HumanChain-aisafety
   ```

2. Build the project:

   ```bash
   mvn clean package
   ```

3. Run the application:

   ```bash
   # Development mode with H2 database
   java -jar target/aisafety-0.0.1-SNAPSHOT.jar

   # Or with Maven
   mvn spring-boot:run
   ```

4. Access the application:

   * Web Interface: [http://localhost:8080](http://localhost:8080)
   * API: [http://localhost:8080/api/incidents](http://localhost:8080/api/incidents)
   * H2 Console (development): [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

### Environment Variables

For production deployment, set the following environment variables:

```bash
SPRING_PROFILES_ACTIVE=prod
JDBC_DATABASE_URL=jdbc:postgresql://hostname:port/database_name
JDBC_DATABASE_USERNAME=your_username
JDBC_DATABASE_PASSWORD=your_password
```

For local development using PostgreSQL instead of H2:

```bash
SPRING_PROFILES_ACTIVE=dev
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/aisafety
SPRING_DATASOURCE_USERNAME=aisafety_user
SPRING_DATASOURCE_PASSWORD=your_password
```

## API Endpoints

The application provides the following RESTful API endpoints:

### 1. Get All Incidents

* **Path:** `/api/incidents`
* **Method:** GET
* **Description:** Retrieve all incidents
* **Response:** 200 OK with JSON array of incidents
* **Example:**

  ```bash
  curl -X GET http://localhost:8080/api/incidents
  ```

### 2. Get Incident by ID

* **Path:** `/api/incidents/{id}`
* **Method:** GET
* **Description:** Retrieve a specific incident by ID
* **Response:** 200 OK with JSON object or 404 Not Found
* **Example:**

  ```bash
  curl -X GET http://localhost:8080/api/incidents/1
  ```

### 3. Create Incident

* **Path:** `/api/incidents`
* **Method:** POST
* **Description:** Create a new incident
* **Request Body:** JSON with title, description, and severity
* **Response:** 201 Created with the created incident or 400 Bad Request for validation errors
* **Example:**

  ```bash
  curl -X POST http://localhost:8080/api/incidents \
    -H "Content-Type: application/json" \
    -d '{"title":"New AI Incident","description":"Description of the incident","severity":"Medium"}'
  ```

### 4. Delete Incident

* **Path:** `/api/incidents/{id}`
* **Method:** DELETE
* **Description:** Delete an incident by ID
* **Response:** 200 OK with success message or 404 Not Found
* **Example:**

  ```bash
  curl -X DELETE http://localhost:8080/api/incidents/1
  ```

## Database Schema

The incidents are stored in a single table with the following schema:

```sql
CREATE TABLE incidents (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(50) NOT NULL,
  reported_at TIMESTAMP NOT NULL
);
```

Fields:

* `id`: Unique identifier, auto-generated primary key
* `title`: Short summary of the incident
* `description`: Detailed description of the incident
* `severity`: Assessment level (Low, Medium, High)
* `reported_at`: Timestamp when the incident was logged

## Design Decisions and Challenges

### Architecture

* **Layered Architecture:** The application follows a standard 3-tier architecture with Controller, Service, and Repository layers to ensure separation of concerns and maintainability.
* **DTO Pattern:** Data Transfer Objects are used to validate input and separate API contract from internal entities.
* **Exception Handling:** Global exception handling is implemented to provide consistent error responses.

### UI Design

* A modern, responsive UI was created using Bootstrap 5 to provide an intuitive user experience.
* Interactive elements like modals for creating and viewing incidents improve usability.
* Severity levels are color-coded for better visual feedback.

### Challenges

1. **CORS Configuration:** Properly configuring CORS for cross-domain communication between frontend and backend, especially in deployment environments.

2. **Database Connection in Production:** Setting up proper environment variables and configurations for the PostgreSQL connection on Render required careful testing.

3. **Caching Issues:** Static resources caching during development led to some inconsistency in the UI updates after code changes.

4. **Validation and Error Handling:** Implementing comprehensive validation while providing meaningful error messages to the user required attention to detail.

---

Created as part of a take-home assignment for Sparklehood, an AI safety startup, focused on demonstrating backend development skills in API design, request handling, and data persistence.
