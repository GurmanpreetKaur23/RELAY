const express = require('express');
const router = express.Router();
const Thread = require('../models/thread');

// Create a new thread
router.post('/', async (req, res) => {
    try {
        const { title, description, tags, category, createdBy } = req.body;

        if (!title || !description || !createdBy) {
            return res.status(400).json({ message: 'Title, description and createdBy are required' });
        }

        const newThread = new Thread({
            title,
            description,
            tags,
            category,
            createdBy
        });

        await newThread.save();
        res.status(201).json(newThread);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all threads
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find().sort({ createdAt: -1 });
        res.json(threads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a thread
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, category } = req.body;

        const updatedThread = await Thread.findByIdAndUpdate(
            id,
            { title, description, tags, category },
            { new: true }
        );

        if (!updatedThread) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        res.json(updatedThread);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a thread
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedThread = await Thread.findByIdAndDelete(id);

        if (!deletedThread) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        res.json({ message: 'Thread deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single thread by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id);

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    res.json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
