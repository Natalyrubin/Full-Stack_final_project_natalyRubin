// Require
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/items', require('./routes/itemsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));



const { PORT } = process.env;


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is listening for requests on http://127.0.0.1:${PORT}`))
});