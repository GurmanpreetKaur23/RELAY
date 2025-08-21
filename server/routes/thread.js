const express = require('express');
const router = express.Router();
const Thread = require('../models/thread');
const auth = require('../middleware/auth');

// Create a new thread (Protected - requires login)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, tags, category } = req.body;

        if (!title || !description) {
            return res.status(400).json({ 
                success: false,
                message: 'Title and description are required' 
            });
        }

        const newThread = new Thread({
            title,
            description,
            tags,
            category,
            createdBy: req.user.userId // Get from authenticated user
        });

        await newThread.save();
        
        // Populate the creator info for response
        await newThread.populate('createdBy', 'username firstName lastName');
        
        res.status(201).json({
            success: true,
            message: 'Thread created successfully',
            thread: newThread
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
});

// Get all threads (Public)
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find()
            .populate('createdBy', 'username firstName lastName')
            .sort({ createdAt: -1 });
            
        res.json({
            success: true,
            message: 'Threads retrieved successfully',
            threads
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
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
