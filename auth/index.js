const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const session = require('express-session');
const cors = require("cors");

const crypto = require('crypto');

const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const sessionKey = generateRandomString(32); // 32 bytes will generate a 64-character hex string
console.log(sessionKey);



const app = express();
const PORT = 4000;

// Connect to MongoDB

const connectWithRetry = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/node-authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Connection to MongoDB failed:', err);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();



app.use(session({
    secret: sessionKey, // Replace with your actual secret key for session encryption
    resave: false,
    saveUninitialized: false
  }));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(async (username, password, done) => {
   
  
    try {
      const user = await User.findOne({ username: username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return done(null, false, { message: 'Incorrect password.' });
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  
  // Routes
  
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  

// Routes


// app.get('/login-failure', (req, res) => {
//   res.send('Login failed');
// });


  








app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required for login.' });
    }
  
    try {
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ message: 'Incorrect username or password.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect username or password.' });
      }
  
      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred during login.' });
    }
  });
  


app.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required for signup.' });
    }
  
    try {
      const existingUser = await User.findOne({ username: username });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      req.login(savedUser, (err) => {
        if (err) {
          return res.status(500).json({ message: 'An error occurred during signup.' });
        }
  
        const { _id, username } = savedUser;
        return res.status(201).json({ message: `User with ID ${_id} and username '${username}' is successfully signed up.` });
      });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred during signup.' });
    }
  });
  