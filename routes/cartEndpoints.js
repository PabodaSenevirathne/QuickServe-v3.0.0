const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET all carts
router.get('/carts', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific cart by ID
router.get('/carts/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart == null) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new cart
router.post('/carts', async (req, res) => {
    const cart = new Cart({
        products: req.body.products,
        quantities: req.body.quantities,
        user: req.body.user
    });

    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a cart by ID
router.delete('/carts/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart == null) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        await cart.remove();
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
