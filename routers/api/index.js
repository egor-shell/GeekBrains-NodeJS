const express = require('express')

const todoApiRoute = require('./todo.js')
const loginApiRouter = require('./auth.js')

const router = express.Router()

router.use('/api/v1', todoApiRoute)
router.use('/api/v1', loginApiRouter)

module.exports = router
