const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const User = require('../models/user');

router.get('/', verifyToken, async (req, res) => {
    const users = await User.all
    res.json(users)
})

module.exports = router
