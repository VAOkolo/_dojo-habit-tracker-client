const express = require('express')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

//routes
const habitRoutes = require('./controllers/habits')
const userRoutes = require('./controllers/users')
const authRoutes = require('./controllers/auth')
//
server.use('/habits', habitRoutes)
server.get('/', (req, res) => res.send('Hello, dojo!'))
server.use('/users', userRoutes)
server.use('/auth', authRoutes)



module.exports = server
