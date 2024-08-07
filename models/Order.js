const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId : {type: String, required: true},
    customerId : {type: String, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    quantity: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    delivery_status: {type: String, default: "Pending"},
    payment_status: {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)