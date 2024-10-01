
const jwt = require('jsonwebtoken');

// function to verify the token recieved by the user on logging in which they will use during booking trains and viewing their bookings.
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
