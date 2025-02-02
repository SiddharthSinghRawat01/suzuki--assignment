const User = require('../models/User');
const Joi = require('joi');

// Validation Schema
const userSchema = Joi.object({
    user: Joi.string().required(),
    interest: Joi.array().items(Joi.string()).required(),
    age: Joi.number().integer().required(),
    mobile: Joi.number().integer().required(),
    email: Joi.string().email().required()
});

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { user, interest, age, mobile, email } = req.body;

        // Validate required fields
        if (!user || !interest || !age || !mobile || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure interest is an array
        if (!Array.isArray(interest)) {
            return res.status(400).json({ message: "Interest must be an array." });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const newUser = new User({ user, interest, age, mobile, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: err.message });
    }
};



exports.updateUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
