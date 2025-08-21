# Relay – Backend API

Relay is a backend API built with **Node.js, Express, and MongoDB**.  
It powers a simple discussion platform where users can create threads and comments, secured with JWT authentication.  

---

## ✨ Features
- User registration and login with hashed passwords (**bcrypt**)  
- JWT-based authentication & middleware for route protection  
- Create, fetch, and manage discussion threads  
- Add and fetch comments under threads  
- Centralized error handling  
- Clean, modular project structure  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Other Tools:** bcrypt, dotenv, cors  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/GurmanpreetKaur23/RELAY.git
cd RELAY/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server/` directory and add:

```env
MONGO_URI=mongodb://localhost:27017/relay_db
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRE=7d
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Start the Server

Run in development mode (with **nodemon**):

```bash
npm run dev
```

Or normal mode:

```bash
npm start
```

The server will start on `http://localhost:3001`

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account
```json
{
  "username": "johndoe",
  "email": "john@example.com", 
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
User login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication)  
**Headers:** `Authorization: Bearer <jwt_token>`

#### POST `/api/auth/logout`
Logout user (requires authentication)

---

### 📝 Threads

#### Create Thread

`POST /api/threads`

```json
{
  "title": "Exam Updates",
  "description": "Any news about exam dates?"
}
```

#### Get All Threads

`GET /api/threads`

#### Get Single Thread

`GET /api/threads/:id`

---

### 💬 Comments

#### Add Comment

`POST /api/threads/:threadId/comments`

```json
{
  "text": "Following this thread!",
  "author": "Gunn"
}
```

#### Get Comments

`GET /api/threads/:threadId/comments`

---

## 📂 Project Structure

```
RELAY/
├── client/                 # React frontend (ready for integration)
│   ├── public/
│   ├── src/
│   └── package.json
├── server/                 # Express backend
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/
│   │   ├── user.js        # User schema with validation
│   │   ├── thread.js      # Thread schema  
│   │   └── comment.js     # Comment schema
│   ├── routes/
│   │   ├── auth.js        # Authentication endpoints
│   │   ├── thread.js      # Thread CRUD operations
│   │   └── commentRoutes.js # Comment operations
│   ├── controllers/        # Business logic handlers
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json       # Dependencies and scripts
└── README.md              # Project documentation
```

---

## 🧑‍💻 Development Notes

### Authentication Implementation
* Passwords are hashed with bcryptjs (salt rounds: 10) before saving to database
* JWT tokens are signed using a secure secret from `.env` with configurable expiration
* Authentication middleware validates tokens and adds user context to requests  
* Protected routes require valid JWT token in Authorization header (Bearer format)
* User model includes validation for email format and password strength
* Account status tracking with `isActive` field for user management

### Security Best Practices
* Environment variables for sensitive configuration (JWT secret, DB URI)
* Password validation (minimum 6 characters) with bcrypt hashing
* JWT token expiration and proper error handling
* CORS configuration for cross-origin requests
* Input sanitization and validation using Mongoose schemas

### Error Handling
* Centralized error handling with consistent JSON responses
* Meaningful error messages for authentication failures
* Proper HTTP status codes (401 for unauthorized, 400 for validation errors)
* Token expiration and invalid token detection

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push your branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License © 2025 — Relay Project

---

## Thread Endpoints

#### GET `/api/threads`
Get all threads

#### POST `/api/threads`
Create a new thread (requires authentication)
```json
{
  "title": "Discussion Title",
  "description": "Thread description here"
}
```

#### GET `/api/threads/:id`
Get a specific thread

#### PUT `/api/threads/:id`
Update a thread (requires authentication and ownership)

#### DELETE `/api/threads/:id`
Delete a thread (requires authentication and ownership)

### Comment Endpoints

#### GET `/api/threads/:threadId/comments`
Get all comments for a thread

#### POST `/api/threads/:threadId/comments`
Add comment to a thread (requires authentication)
```json
{
  "text": "This is my comment!",
  "author": "username"
}
```

---

## 🔐 Authentication System

This project implements a robust JWT-based authentication system:

### Security Features
- **Password Hashing**: All passwords are hashed using bcryptjs before storage
- **JWT Tokens**: Secure, stateless authentication with configurable expiration
- **Middleware Protection**: Route-level authorization using custom middleware
- **Input Validation**: Email format validation and password strength requirements
- **User Verification**: Account status checking and token validation

### Protected Routes
The following operations require authentication:
- Creating threads (`POST /api/threads`)
- Updating threads (`PUT /api/threads/:id`)
- Deleting threads (`DELETE /api/threads/:id`) 
- Accessing user profile (`GET /api/auth/profile`)
- User logout (`POST /api/auth/logout`)

### Authentication Flow
1. User registers with email, username, and password
2. Password is hashed and user is saved to database
3. JWT token is generated and returned
4. Client includes token in Authorization header for protected routes
5. Middleware verifies token and adds user info to request object

---

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  firstName: String (required, 2-50 chars),
  lastName: String (required, 2-50 chars),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Thread Model  
```javascript
{
  title: String (required),
  description: String (required),
  author: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  thread: ObjectId (ref: Thread, required),
  text: String (required),
  author: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing the API

### Using Postman

1. **Register a new user:**
   - POST `http://localhost:3001/api/auth/signup`
   - Body: JSON with username, email, password, firstName, lastName

2. **Login to get token:**
   - POST `http://localhost:3001/api/auth/login`  
   - Body: JSON with email and password
   - Copy the returned JWT token

3. **Test protected routes:**
   - Add Authorization header: `Bearer <your_jwt_token>`
   - Create threads, access profile, etc.

### Authentication Testing
```bash
# Register new user
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'

# Login and get token  
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Access protected route
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```