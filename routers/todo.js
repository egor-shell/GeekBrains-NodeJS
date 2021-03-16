const express = require('express')
const controllers = require('../controllers')

const router = express.Router()

router.get('/todo', controllers.todo.todoPage)
router.post('/todo', controllers.todo.createTask);
router.post('/todo/:ID_Task/delete', controllers.todo.deleteTask);
router.post('/todo/:ID_Task/description/', controllers.todo.updateNameTask)

module.exports = router