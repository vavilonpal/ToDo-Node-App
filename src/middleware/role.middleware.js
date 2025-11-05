
exports.isAdmin = (req, res, next) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized: user not found in request' });
            }

            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied: admin role required'});
            }

            next();
        } catch (error) {
            console.error('isAdmin middleware error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

};


exports.isOwnerOrAdmin = (getOwnerId) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized: user not found in request' });
            }

            if (req.user.role === 'admin') {
                return next();
            }

            const ownerId = await getOwnerId(req);
            if (!ownerId) {
                return res.status(404).json({ message: 'Resource not found' });
            }
            if (req.user.userId !== ownerId) {
                return res.status(403).json({ message: 'Access denied: not your resource' });
            }

            next();
        } catch (error) {
            console.error('isOwnerOrAdmin middleware error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
};
