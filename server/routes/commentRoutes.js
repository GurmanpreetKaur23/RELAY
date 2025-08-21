const express = require('express');
const router = express.Router();
const {
	addComment,
	getCommentsByThread
} = require('../controller/commentController');

// Add a comment to a thread
router.post('/:threadId/comments', addComment);

// Get all comments for a thread
router.get('/:threadId/comments', getCommentsByThread);

module.exports = router;