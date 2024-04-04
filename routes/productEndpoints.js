const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a single product by ID
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new product
router.post('/', async (req, res) => {
    const { productId, description, image, price, shippingCost } = req.body;

    try {
        let product = await Product.findOne({ productId });
        if (product) {
            return res.status(400).json({ msg: 'Product already exists' });
        }

        product = new Product({
            productId,
            description,
            image,
            price,
            shippingCost
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT (update) a product
router.put('/:productId', async (req, res) => {
    const { description, image, price, shippingCost } = req.body;

    try {
        let product = await Product.findOne({ productId: req.params.productId });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.description = description;
        product.image = image;
        product.price = price;
        product.shippingCost = shippingCost;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a product
router.delete('/:productId', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productId: req.params.productId });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

