const express = require('express');
const connectDB = require('./config/database'); 
const cors = require('cors');
const userRouter = require('./router/user');
// const bookRoutes = require('./routes/book');

const app = express();
connectDB();

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api/auth', userRouter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;