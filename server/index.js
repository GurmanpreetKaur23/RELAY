const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../routes/auth');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const threadRoutes = require('./routes/thread');
app.use('/threads', threadRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/threads", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
