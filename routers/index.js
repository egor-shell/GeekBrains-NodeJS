const express = require('express');

const mainRouter = require('./main.js')
const todoRouter = require('./todo.js')
const authRouter = require('./auth.js')
const apiRouter = require('./api')
const chatRouter = require('./chat.js')

const router = express.Router();

router.use(todoRouter)
router.use(chatRouter)
router.use(apiRouter)
router.use(authRouter)
router.use(mainRouter)

module.exports = router;