const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific order by ID
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new order
router.post('/orders', async (req, res) => {
    const order = new Order({
        products: req.body.products,
        quantities: req.body.quantities,
        user: req.body.user,
        totalAmount: req.body.totalAmount,
        orderDate: req.body.orderDate || Date.now()
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an order by ID
router.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.remove();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
