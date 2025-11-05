const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('JWT_SECRET not defined in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }
        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
