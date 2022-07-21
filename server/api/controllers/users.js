const express = require('express');
const router = express.Router();


const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
})

router.get('/:email', async (req, res) => {
    try {
        const users = await User.findByEmail(req.params.email)
        res.json(users)
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router
