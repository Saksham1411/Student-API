const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }
    const token = authHeader.split(' ')[1];

    // if (!token) return next();
    try {
        const payload = jwt.verify(token, process.env.JWT_SECERT);
        req.user = { ...payload };
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = checkAuth;