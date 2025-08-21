const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
const threadRoutes = require('./routes/thread');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/commentRoutes');

app.use('/api/threads', threadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'RELAY API Server is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
