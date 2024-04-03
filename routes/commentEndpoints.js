const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific comment by ID
router.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new comment
router.post('/comments', async (req, res) => {
    const comment = new Comment({
        product: req.body.product,
        user: req.body.user,
        rating: req.body.rating,
        image: req.body.image,
        text: req.body.text
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a comment by ID
router.patch('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (req.body.product != null) {
            comment.product = req.body.product;
        }
        if (req.body.user != null) {
            comment.user = req.body.user;
        }
        if (req.body.rating != null) {
            comment.rating = req.body.rating;
        }
        if (req.body.image != null) {
            comment.image = req.body.image;
        }
        if (req.body.text != null) {
            comment.text = req.body.text;
        }
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a comment by ID
router.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
