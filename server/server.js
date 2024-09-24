const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the login page
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Read the existing users
        const users = JSON.parse(await fs.promises.readFile('users.json', 'utf8'));

        // Check if the username already exists
        if (users[username]) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        users[username] = hashedPassword;
        await fs.promises.writeFile('users.json', JSON.stringify(users, null, 2));

        res.send('Registration successful');
    } catch (error) {
        console.error('Error handling registration:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
        // Read the existing users
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

        // Check if the user exists
        if (!users[username]) {
            return res.status(401).send('User does not exist');
        }

        // Compare the password with the hashed password
        const match = await bcrypt.compare(password, users[username]);
        if (match) {
            res.send('Login successful');
        } else {
            res.status(401).send('Password is incorrect');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
