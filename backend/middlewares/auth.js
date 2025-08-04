const jwt = require("jsonwebtoken");
const Business = require("../models/Business"); 

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.Jwt_secret);

            req.business = await Business.findById(decoded.id).select('-password'); 
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Not authorized, token failed!' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }
};
