// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:root@cluster0.jfvf9v2.mongodb.net/?retryWrites=true&w=majority";
// ... (Other required modules and middleware)

// Connect to MongoDB
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      serverSelectionTimeoutMS: 5000,
    }
  });

mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
serverSelectionTimeoutMS: 5000, // Set a longer timeout
});
  
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Middleware for parsing JSON requests
app.use(express.json());

// ... (Other middleware and route configurations)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ... (Previous code)

// Example user schema (Mongoose)
const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
  },'users');
  
  // Example user registration endpoint
app.post('/register', async (req, res) => {
const { username, email, password } = req.body;

// Hashing password before saving to the database
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

const newUser = new User({ username, email, password: hashedPassword });
await newUser.save();

res.status(201).json({ message: 'User registered successfully' });
});

// Example login endpoint
app.post('/login', async (req, res) => {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
}

const validPassword = await bcrypt.compare(password, user.password);
console.log(`actual =${user.password} , input = ${password} `)
if (!validPassword) {
    console.log(`actual =${user.password} , input = ${password} `)
    return res.status(401).json({ message: 'Invalid credentials' });
}

// Example login endpoint for GET requests (can be a different route or the same route)
app.get('/login', (req, res) => {
  res.send('This is the login page');
});


// Generate JWT token upon successful login
const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

res.json({message: "Login Successfull !", token });
});

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
const token = req.header('Authorization');
if (!token) return res.status(401).send('Access denied');

jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
});
};

