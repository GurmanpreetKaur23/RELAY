const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    category: String,
    createdBy: { type: String, required: true }, // For simplicity, store user name or id
    createdAt: { type: Date, default: Date.now },
    replies: [{ content: String, createdBy: String, createdAt: Date }],
    votes: [{ userId: String, type: String }] // type = upvote or downvote
});

module.exports = mongoose.model('Thread', threadSchema);
