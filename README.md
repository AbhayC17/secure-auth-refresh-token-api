# Secure Auth Refresh Token API

A secure backend authentication API built using Node.js, Express.js, MongoDB, JWT, and refresh tokens. This project demonstrates how modern web applications handle user registration, login, protected routes, access tokens, and refresh token-based session management.

## Overview

Secure Auth Refresh Token API is a backend project focused on implementing a production-style authentication flow. It uses short-lived access tokens for accessing protected routes and refresh tokens for generating new access tokens without requiring users to log in repeatedly.

This project is useful for understanding real-world backend authentication systems used in modern applications.

## Features

- User registration
- User login
- Password hashing
- JWT access token generation
- Refresh token generation
- Protected routes
- Token validation middleware
- Refresh token-based access token renewal
- Environment variable configuration
- Structured error handling
- Clean backend folder structure
- API testing using Postman or PowerShell

## Why This Project Matters

Authentication is one of the most important parts of backend development. This project shows how applications securely manage login sessions using access tokens and refresh tokens.

It helps demonstrate knowledge of:

- Backend API development
- Secure password handling
- JWT authentication
- Middleware-based route protection
- Token-based session management
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- dotenv
- Nodemon
- Thunder Client
- Git
- GitHub

## Authentication Workflow

```text
User registers
        |
        v
Password is hashed and stored
        |
        v
User logs in
        |
        v
Server verifies email and password
        |
        v
Access token and refresh token are generated
        |
        v
User accesses protected routes using access token
        |
        v
When access token expires, refresh token is used
        |
        v
New access token is generated
```

## Access Token vs Refresh Token

### Access Token

An access token is a short-lived token used to access protected API routes.

Example:

```text
Authorization: Bearer access_token_here
```

### Refresh Token

A refresh token is a longer-lived token used to generate a new access token when the old access token expires. This helps users stay logged in securely without entering credentials again.

## API Endpoints

### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "Abhay",
  "email": "abhay@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "abhay@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "access_token_here",
  "refreshToken": "refresh_token_here"
}
```

### Access Protected Route

```http
GET /api/protected
```

Headers:

```text
Authorization: Bearer access_token_here
```

Response:

```json
{
  "success": true,
  "message": "You have access to this protected route"
}
```

### Refresh Access Token

```http
POST /api/auth/refresh-token
```

Request body:

```json
{
  "refreshToken": "refresh_token_here"
}
```

Response:

```json
{
  "success": true,
  "accessToken": "new_access_token_here"
}
```

## Project Highlights

- Built a secure backend authentication API using Node.js, Express.js, MongoDB, JWT, and bcrypt.
- Implemented access token and refresh token workflow for secure session handling.
- Added protected routes using authentication middleware.
- Used password hashing to prevent plain-text password storage.
- Structured the backend into routes, controllers, models, middleware, and services.
- Tested API endpoints using Postman and PowerShell.

## Folder Structure

```text
secure-auth-refresh-token-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── services/
│   │   └── auth.service.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── .env.example
├── README.md
└── .gitignore
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AbhayC17/secure-auth-refresh-token-api.git
cd secure-auth-refresh-token-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

### 4. Start the Server

For development:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The server will run on:

```text
http://localhost:5000
```

## Testing the API

You can test the API using:

- Postman
- Thunder Client
- PowerShell
- cURL

### PowerShell Example for Registration

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body '{"name":"Abhay","email":"abhay@example.com","password":"password123"}'
```

### PowerShell Example for Login

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body '{"email":"abhay@example.com","password":"password123"}'
```

## Screenshots

Add your screenshots here:

```markdown
![Register API Test](assets/screenshots/register.png)
![Login API Test](assets/screenshots/login.png)
![Protected Route Test](assets/screenshots/protected-route.png)
![Refresh Token Test](assets/screenshots/refresh-token.png)
```

## Security Practices Used

- Passwords are hashed before storage
- JWT is used for stateless authentication
- Access tokens are short-lived
- Refresh tokens are used to renew access tokens
- Protected routes are secured using middleware
- Sensitive data is stored in environment variables
- Error messages are handled in a structured way

## Future Enhancements

- Logout functionality
- Refresh token rotation
- Email verification
- Password reset feature
- Role-based access control
- Rate limiting
- Account lock after repeated failed login attempts
- API documentation using Swagger
- Deployment on Render, Railway, or Azure

## Learning Outcomes

Through this project, I learned:

- Backend API development using Node.js and Express.js
- MongoDB database integration
- JWT-based authentication
- Refresh token workflow
- Password hashing using bcrypt
- Middleware-based route protection
- Environment variable management
- API testing using Postman and PowerShell
- Clean backend project structuring

## Demo

Live Demo: Add your deployed link here  
GitHub Repository: https://github.com/AbhayC17/secure-auth-refresh-token-api

## Author

**Abhay C**  
Computer Science Engineering Student  
Interested in Backend Development, AI Engineering, Cloud Computing, and Secure API Development.

## Connect With Me

LinkedIn: Add your LinkedIn link here  
GitHub: https://github.com/AbhayC17

## License

This project is open-source and created for educational and backend development learning purposes.
