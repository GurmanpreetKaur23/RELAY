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


module.exports = router;
