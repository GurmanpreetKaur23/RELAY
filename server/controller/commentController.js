const Comment = require("../models/comment");
const Thread = require("../models/thread");

exports.addComment = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { text, author } = req.body;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    const comment = new Comment({
      thread: threadId,
      text,
      author: author || "Anonymous",
    });

    await comment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentsByThread = async (req, res) => {
  try {
    const { threadId } = req.params;

    const comments = await Comment.find({ thread: threadId }).sort({
      createdAt: -1,
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
