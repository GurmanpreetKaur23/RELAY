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

### 1. Clone the Repository
```markdown
git clone [RELAY](https://github.com/GurmanpreetKaur23/RELAY.git)
cd relay/server
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the `server/` folder and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/relay
SECRET=your_jwt_secret
```

### 4. Run the Server

Run in development mode (with **nodemon**):

```bash
npm run dev
```

Or normal mode:

```bash
npm start
```

Server should now be running at:
👉 `http://localhost:5000`

---

## 📌 API Endpoints

### 🔑 Authentication

#### Register

`POST /api/register`

```json
{
  "username": "Gunn",
  "email": "gunn@gmail.com",
  "password": "mypassword123"
}
```

#### Login

`POST /api/login`

```json
{
  "email": "gunn@gmail.com",
  "password": "mypassword123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```

Add the token in request headers:

```
Authorization: Bearer <token>
```

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
server/
│── controllers/    # Handles business logic
│── models/         # Mongoose schemas
│── routes/         # API route definitions
│── index.js       # App entry point
│── package.json    # Scripts & dependencies
│── .env            # Environment variables
```

---

## 🧑‍💻 Development Notes

* Passwords are hashed with bcrypt before saving
* JWT tokens signed using secret from `.env`
* Middleware ensures only authenticated users can access protected routes
* Error handling is centralized and returns meaningful messages

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
