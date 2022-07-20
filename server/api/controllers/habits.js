const express = require('express')
const router = express.Router()

const Habit = require('../models/habits')

//getting all user habit data
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({err})
    }
})

//getting all users (users) habit data
router.get('/:email', async (req, res) => {
    try {
        const habits = await Habit.findByEmail(req.params.email)
        res.json(habits)
    } catch(err) {
        res.status(500).json({err})
    }
})

//getting specific habit
router.get('/id/:id', async (req, res) => {
    try {
        console.log("*************")
        console.log(req.params.id)
        const habitList = await Habit.findByHabit(req.params.id)
        res.json(habitList)
    } catch(err) {
        console.log(err)
        res.status(500).json({err})
    }
})

//posting new habit
router.post('/', async (req, res) => {
    try {
        const habit = Habit.create(req.body.content, req.body.email)
        res.json(habit)
    } catch (err) {
        res.status(404).json({err})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Habit.findByHabit(req.params.id)
        await post.destroy()
        res.status(204).json('Post deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})

//updating users habits
router.put('/:id', async (req, res) => {
    try {
        const dates = req.body.date
        const status = req.body.complete
        const note = req.body.note
        console.log(dates,status)
        const habit = await Habit.findByHabit(req.params.id)
        // console.log(habit)
        await habit.update(dates, status, note)
        res.status(204).json('Habit updated')
    } catch(err){
        res.status(500).json({err})
    }
})


module.exports = router;
