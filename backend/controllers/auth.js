const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Business = require("../models/Business"); 
// Token generator
const tokenGenerator = (businessId) => {
    return jwt.sign({ id: businessId }, process.env.Jwt_secret, { expiresIn: '7d' });
};

// Register business
exports.registerBusiness = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingBusiness = await Business.findOne({ email });

        if (existingBusiness) {
            return res.status(400).json({ message: 'Business already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newBusiness = await Business.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = tokenGenerator(newBusiness._id);

        res.status(201).json({
            token,
            business: {
                id: newBusiness._id,
                name: newBusiness.name,
                email: newBusiness.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login business
exports.loginBusiness = async (req, res) => {
    const { email, password } = req.body;

    try {
        const business = await Business.findOne({ email });

        if (!business) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, business.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = tokenGenerator(business._id);

        res.status(200).json({
            token,
            business: {
                id: business._id,
                name: business.name,
                email: business.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
