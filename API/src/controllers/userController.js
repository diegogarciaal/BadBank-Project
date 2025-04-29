const bcrypt = require('bcrypt');
const User = require('../models/User');
const accountController = require('./accountController');
const historyController = require('./historyController');

// Function to create a user
const createUser = async (req, res) => {
    const { name, email, password, account } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            account
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to search for a user by email and password
const findUserByNameAndPassword = async (req, res) => {
    const { name, password } = req.body;
    console.log(name)
    console.log(password)
    try {
        // Find user by name
        let user = await User.findOne({ name });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid name or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid name or password' });
        }

        // Respond with user data (excluding password)
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json(userWithoutPassword);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    ...accountController,
    ...historyController,
    createUser,
    getUsers,
    findUserByNameAndPassword
};
