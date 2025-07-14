const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/userRoutes');
const incomeRoutes = require('./routes/transaction.routes');
const metaRoutes = require('./routes/metaRoutes');
const profileRoute = require('./routes/profileRoutes.js');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/transactions', incomeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoute);


app.use('/api/income', incomeRoutes);
app.use('/api/meta', metaRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server started on port 5000'));
}).catch(err => console.error(err));