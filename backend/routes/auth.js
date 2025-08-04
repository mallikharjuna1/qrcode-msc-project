const express = require("express");
const { registerBusiness, loginBusiness } = require('../controllers/auth');
const router = express.Router();

// api/auth/login

router.post('/login', loginBusiness);

// api/auth/register

router.post('/register', registerBusiness);

module.exports = router;