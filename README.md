# Auth Refresh Token API

A secure backend authentication API built using Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, and Zod.  
The project implements user registration, login, access token authentication, refresh token rotation, logout, request validation, global error handling, rate limiting, and secure backend practices.

---

## Features

- User registration
- User login
- Password hashing using bcrypt
- JWT access token authentication
- Refresh token generation
- Refresh token rotation
- Logout by refresh token revocation
- Protected profile route
- Request validation using Zod
- Global error handling
- MongoDB database integration using Mongoose
- Security headers using Helmet
- CORS configuration
- Rate limiting for authentication routes
- Environment-based configuration
- Graceful shutdown handling
- Health check route

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod
- Helmet
- CORS
- Morgan
- express-rate-limit
- dotenv

---

## Folder Structure

```txt
auth-refresh-token-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── refreshToken.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── token.service.js
│   │
│   ├── utils/
│   │   ├── appError.js
│   │   └── asyncHandler.js
│   │
│   ├── validations/
│   │   └── auth.validation.js
│   │
│   └── app.js
│
├── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md