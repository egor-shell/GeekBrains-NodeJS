const express = require('express');

const mainRouter = require('./main.js');
// const userRouter = require('./user.js');
const todoRouter = require('./todo.js');
const authRouter = require('./auth.js');
const apiRouter = require('./api')

const router = express.Router();

router.use(todoRouter);
// router.use('/user', userRouter);
router.use(apiRouter)
router.use(authRouter);
router.use(mainRouter);

module.exports = router;