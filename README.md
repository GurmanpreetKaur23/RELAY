# RELAY - Online Forum / Discussion Board

A **MERN Stack Project** for an Online Discussion Forum with user authentication, thread management, and comment functionality.

## 🚀 Features

- **User Authentication** (JWT-based signup/login)
- **Thread Management** (CRUD operations)
- **Comment System** 
- **User Profiles**
- **Secure Password Handling**
- **RESTful API Design**

## 🔧 Tech Stack

- **Node.js + Express** → Backend framework
- **MongoDB + Mongoose** → Database
- **React** → Frontend framework
- **JWT** → Authentication
- **bcryptjs** → Password hashing
- **dotenv** → Environment variables
- **CORS + body-parser** → Middleware

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vrindaa4/RELAY
   cd RELAY/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/relay_db
   JWT_SECRET=relay_super_secret_jwt_key
   JWT_EXPIRE=7d
   PORT=3001
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ../client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
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

#### POST `/api/auth/logout`
Logout user (requires authentication)

### Thread Endpoints

#### GET `/api/threads`
Get all threads

#### POST `/api/threads`
Create a new thread (requires authentication)
```json
{
  "title": "Thread Title",
  "description": "Thread description"
}
```

#### GET `/api/threads/:id`
Get a specific thread

#### PUT `/api/threads/:id`
Update a thread (requires authentication)

#### DELETE `/api/threads/:id`
Delete a thread (requires authentication)

### Comment Endpoints

#### GET `/api/threads/:threadId/comments`
Get all comments for a thread

#### POST `/api/threads/:threadId/comments`
Add comment to a thread
```json
{
  "text": "This is my comment!",
  "author": "John Doe"
}
```

#### PUT `/api/threads/:threadId/comments/:commentId`
Update a comment
```json
{
  "text": "Updated comment text"
}
```

#### DELETE `/api/threads/:threadId/comments/:commentId`
Delete a comment

## 🔐 Authentication System

This project implements a robust JWT-based authentication system:

- **Password Security**: Passwords are hashed using bcryptjs
- **JWT Tokens**: Secure token-based authentication
- **Middleware Protection**: Protected routes require valid JWT tokens
- **User Validation**: Email and username uniqueness validation
- **Account Management**: User profile management and logout functionality

### Protected Routes
All thread creation, modification, and deletion operations require authentication.

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
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
  author: ObjectId (ref: User),
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

## 🧪 Testing

### Using Postman
1. Import the provided Postman collection
2. Set up environment variables for base URL and authentication tokens
3. Test authentication endpoints first
4. Use the received JWT token for protected routes

### Manual Testing
1. Register a new user via `/api/auth/signup`
2. Login to get JWT token via `/api/auth/login`
3. Include the token in Authorization header: `Bearer <your-token>`
4. Test thread CRUD operations

## 🚀 Deployment

### Environment Variables for Production
```env
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secure-jwt-secret>
JWT_EXPIRE=7d
PORT=3001
NODE_ENV=production
CLIENT_URL=<your-frontend-url>
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🏗️ Project Structure

```
RELAY/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/                 # Express backend
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/
│   │   ├── user.js        # User schema
│   │   ├── thread.js      # Thread schema
│   │   └── comment.js     # Comment schema
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── thread.js      # Thread routes
│   ├── controller/
│   │   └── commentController.js # Comment logic
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## 🎯 Future Enhancements

- [ ] Email verification for user registration
- [ ] Password reset functionality
- [ ] User roles and permissions
- [ ] Thread categories and tags
- [ ] Comment upvoting/downvoting
- [ ] Real-time notifications
- [ ] Image upload for threads
- [ ] Search functionality

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Vrinda** - [@vrindaa4](https://github.com/vrindaa4) - Authentication System Implementation
- **Gurmanpreet Kaur** - [@GurmanpreetKaur23](https://github.com/GurmanpreetKaur23) - Original RELAY Project

---

**Happy Coding! 🚀**
