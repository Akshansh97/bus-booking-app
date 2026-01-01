const User = require('../models/User');
// /api/users

async function addUser(req, res) {
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !phone || !password || !role) {
            return res.json({ error: "Name, Email, Phone, Password and Role are required" });
        }
        const user = await User.create({ name, email, phone, password, role });
        res.status(201).json({
            message: "User added successfully",
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email or Phone already exists!!" });
        }
        console.error(error);
        res.status(500).send(error);
    }
}

async function getAllUsers(req, res){
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { addUser, getAllUsers };