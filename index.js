// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();


// Connect to MongoDB

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });


// Define schema for enrolled users
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  selectedBatch: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// API endpoint for enrolling users
app.post('/enroll', async (req, res) => {
  try {
    // Assuming CompletePayment is a mock function that returns a success message
    const paymentResponse = await CompletePayment(req.body);

    // Store user data in the database
    const newUser = new User(req.body);
    await newUser.save();

    res.json({ success: true, message: 'Enrollment successful', paymentResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Enrollment failed', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Mock function for payment (not implemented)
async function CompletePayment(userDetails) {
  // Implement the payment logic here (mocked for now)
  return { status: 'success', message: 'Payment completed successfully' };
}
