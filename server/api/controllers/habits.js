const express = require('express')
const router = express.Router()

const Habit = require('../models/habits')

router.get('/', async (req, res) => {
    try {
        console.log("TESTING")
        const habits = await Habit.all;
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({err})
    }
})

router.get('/:email', async (req, res) => {
    try {
        const habits = await Habit.findByEmail(req.params.email)
        // console.log(posts)
        res.json({habits})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    try {
        const habit = Habit.create(req.body.content, req.body.email)
        res.json(habit)
    } catch (err) {
        res.status(404).json({err})
    }
})

module.exports = router;
