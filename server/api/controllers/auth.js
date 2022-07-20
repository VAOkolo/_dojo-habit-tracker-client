require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        console.log("INSIDE POST")
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        console.log(req)
        if(!user){ throw new Error('No user with this email') }
        console.log(req.body.password)
        if(req.body.password !== user.password){
            throw new Error('Incorrect password') 
        }
        const authed = bcrypt.compare(req.body.password, user.password)
        console.log(authed)
        if (!!authed){
            console.log(user.password)
            const payload = { username: user.username, email: user.email }
            console.log(payload)
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: "20s"}, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log();
        res.status(401).json({ err: err.message });
    }
})

module.exports = router
