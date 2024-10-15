const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT;

app.use(express.json());
app.use(cors())

const mongoURL = process.env.MONGOURL;

mongoose.connect(mongoURL)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.error('MongoDB connection error: ', error));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// User Model 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});

const User = mongoose.model('User', userSchema);

/****** URL requests  **********/

// Sign Up route
app.post('/api//signup', async (req, res) => {
    const { username, password } = req.body

    const userExists =  await User.findOne({ username });
    if(userExists) return res.status(400).send('User already exist!');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword});

    await user.save();
    res.status(201).send('User registered successfully')
});

// Login route
app.post('/api/login', async (req,res) => {
    const { username, password } = req.body;

    const user =  await User.findOne({ username });
    if(!user) return res.status(400).send('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(400).send('Invalid Password!');

    const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({token});
})