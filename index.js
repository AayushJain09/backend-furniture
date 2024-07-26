const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRouter);
app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
