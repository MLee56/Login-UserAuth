const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let users = [];
let activeTokens = [];

function findUser(username) {  // Helper function to find a user by username in the in-memory users array.
    return users.find(user => user.username === username);
}

function validateCredentials(username, password) {  // Helper function to validate user credentials against the in-memory users array.
    const user = findUser(username);
    if (!user || user.password !== password) return null;
    return user;
}

function generateToken(username) {  // Helper function to generate a simple token for authenticated users. In a real application, this should be more secure and use a library like JWT.
    const token = username + '-token';
    if (!activeTokens.includes(token)) {
        activeTokens.push(token);
    }
    return token;
}

app.post('/register', (req, res) => {  // Handle user registration. Checks for required fields, uniqueness of username, and stores user data in memory.
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    if (findUser(username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => { // Handle user login. Validates credentials and generates a simple token for authenticated users, which is stored in memory.
    const { username, password } = req.body;
    const user = validateCredentials(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(username);
    res.status(200).json({ message: 'Login successful', token });
});

app.listen(port, () => {
    console.log(`Auth service is running on http://localhost:${port}`);
});