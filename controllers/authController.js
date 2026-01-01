const User = require('../models/User');

// /api/auth

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            const err = new Error();
            err.name = 'UserNotFoundError';
            return next(err);
        }
        if(user.password !== password) {
            return res.status(401).json({ error: "Invalid Password" });
        }
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}