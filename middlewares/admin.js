function verifyAdmin(req, res, next) {
    const apiKey = req.headers['x-api-key']; // a secret api key used by admin while updating trains in DB so that only admin can update the data of trains and not the user.
    if (apiKey === process.env.ADMIN_API_KEY) {
        next();
    } else {
        res.status(403).send('Forbidden: Invalid API key');
    }
}

module.exports = verifyAdmin;
