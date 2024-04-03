const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    quantities: [Number],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
