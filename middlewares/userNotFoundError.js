//user not found error middleware
module.exports = (err, req, res, next) => {
    if (err.name === 'UserNotFoundError') {
        return res.status(404).json({ error: 'User not found!!' });
    }
    next();
};

