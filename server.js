const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contact');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/contact', contactRoute);

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));