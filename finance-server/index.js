const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./autoSavingCron'); 

const transactionRoutes = require('./routes/transactions');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const incomeRoutes = require('./routes/transaction.routes');
const metaRoutes = require('./routes/metaRoutes');
const savingsGoalsRoutes = require('./routes/savingGoals');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/transactions', transactionRoutes);
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);


app.use('/api/income', incomeRoutes);
app.use('/api/meta', metaRoutes);

app.use('/api/goals', savingsGoalsRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server started on port 5000'));
}).catch(err => console.error(err));