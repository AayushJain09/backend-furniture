const Order = require('../models/Order');

module.exports = {

    getUserOrders: async (req, res) => {
        const userId = req.params.userId;
        try {
            const userOrders = await Order.find({ user: userId }).populate({
                path: 'productId',
                select: "-description -product_location"
            }).exec();
            res.status(200).json(userOrders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}