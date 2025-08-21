# Online Discussion Forum 

This is a **MERN Stack Project** for an Online Discussion Forum (like a mini StackOverflow/Reddit).
It supports **CRUD operations for threads** (create, read, update, delete) and contains features such as **user authentication, replies, upvotes/downvotes, search, and filters by tags, category, most recent, most upvoted**.

---

## 🚀 Tech Stack

* **Node.js + Express** → Backend framework
* **MongoDB + Mongoose** → Database
* **dotenv** → Environment variables
* **CORS + body-parser** → Middleware

---

## ⚙️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/GurmanpreetKaur23/RELAY
   cd RELAY
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the project root:

   ```
   MONGO_URI=mongodb://localhost:27017/forumDB
   PORT=5000
   ```

   > Replace `mongodb://localhost:27017/forumDB` with your actual MongoDB connection string if using MongoDB Atlas.

4. **Run the server**

   ```bash
   npm start
   ```

   You should see:

   ```
   MongoDB connected
   Server running on port 5000
   ```

---

## 📌 API Endpoints

Base URL: `http://localhost:5000/threads`

### 1️⃣ Create a Thread

**POST** `/threads`

**Request Body (JSON):**

```json
{
  "title": "How to learn React?",
  "description": "I want resources to learn React as a beginner.",
  "tags": ["react", "javascript", "frontend"],
  "category": "Programming",
  "createdBy": "student123"
}
```

**Response:**

```json
{
  "_id": "64ff...",
  "title": "How to learn React?",
  "description": "I want resources to learn React as a beginner.",
  "tags": ["react", "javascript", "frontend"],
  "category": "Programming",
  "createdBy": "student123",
  "createdAt": "2025-08-21T12:34:56.789Z",
  "replies": [],
  "votes": []
}
```

---

### 2️⃣ Get All Threads

**GET** `/threads`

**Response:**

```json
[
  {
    "_id": "64ff...",
    "title": "How to learn React?",
    "description": "I want resources to learn React as a beginner.",
    "tags": ["react", "javascript"],
    "category": "Programming",
    "createdBy": "student123",
    "createdAt": "2025-08-21T12:34:56.789Z"
  }
]
```

---

### 3️⃣ Get Single Thread by ID

**GET** `/threads/:id`

Example:
`GET http://localhost:5000/threads/64ff123456`

**Response:**

```json
{
  "_id": "64ff...",
  "title": "How to learn React?",
  "description": "I want resources to learn React as a beginner.",
  "tags": ["react", "javascript"],
  "category": "Programming",
  "createdBy": "student123",
  "createdAt": "2025-08-21T12:34:56.789Z",
  "replies": [],
  "votes": []
}
```

---

### 4️⃣ Update a Thread

**PUT** `/threads/:id`

**Request Body (JSON):**

```json
{
  "title": "Best way to learn React?",
  "description": "Should I start with docs, YouTube, or a course?",
  "tags": ["react", "learning"],
  "category": "Frontend"
}
```

**Response:**

```json
{
  "_id": "64ff...",
  "title": "Best way to learn React?",
  "description": "Should I start with docs, YouTube, or a course?",
  "tags": ["react", "learning"],
  "category": "Frontend",
  "createdBy": "student123",
  "createdAt": "2025-08-21T12:34:56.789Z"
}
```

---

### 5️⃣ Delete a Thread

**DELETE** `/threads/:id`

**Response:**

```json
{ "message": "Thread deleted successfully" }
```

---

### 6️⃣ Add a Comment

**POST:** `http://localhost:5000/api/threads/<threadId>/comments`

Example:
`POST http://localhost:5000/api/threads/68a72336e25c76cf123e1b71/comments`

**Body (JSON):**

```
{
  "text": "This is my first comment!",
  "author": "John Doe"
}
```

**Response:**

```json
{
  "message": "Comment added successfully",
  "comment": {
    "thread": "68a72336e25c76cf123e1b71",
    "text": "This is my first comment!",
    "author": "John Doe",
    "_id": "68a7312a60dee53995cc98f8",
    "createdAt": "2025-08-21T14:46:02.539Z",
    "updatedAt": "2025-08-21T14:46:02.539Z",
    "__v": 0
  }
}
```

---

### 7️⃣ Get All Comments for a Thread

**GET:** `http://localhost:5000/api/threads/<threadId>/comments`

Example:
`GET http://localhost:5000/api/threads/68a72336e25c76cf123e1b71/comments`

**Response:**

```json
[
  {
    "_id": "68a7312a60dee53995cc98f8",
    "thread": "68a72336e25c76cf123e1b71",
    "text": "Please someone update me as well",
    "author": "Alice Bolton",
    "createdAt": "2025-08-21T14:46:02.539Z",
    "updatedAt": "2025-08-21T14:46:02.539Z",
    "__v": 0
  },
  {
    "_id": "68a72d08d1d30d802e694775",
    "thread": "68a72336e25c76cf123e1b71",
    "text": "Following",
    "author": "Peter Parker",
    "createdAt": "2025-08-21T14:28:24.512Z",
    "updatedAt": "2025-08-21T14:28:24.512Z",
    "__v": 0
  },
  {
    "_id": "68a72cdbd1d30d802e694772",
    "thread": "68a72336e25c76cf123e1b71",
    "text": "This is my first comment!",
    "author": "John Doe",
    "createdAt": "2025-08-21T14:27:39.897Z",
    "updatedAt": "2025-08-21T14:27:39.897Z",
    "__v": 0
  }
]
```
