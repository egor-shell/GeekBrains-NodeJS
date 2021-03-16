const express = require('express')
const controllers = require('../../controllers')

const router = express.Router()

router.get('/todo', controllers.api.todo.getTasks)
router.post('/todo', controllers.api.todo.createTask)
router.patch('/todo/:ID_Task/description/', controllers.api.todo.updateNameTask)
router.patch('/todo/:ID_Task/complete/', controllers.api.todo.completeTask)
router.delete('/todo/:ID_Task/', controllers.api.todo.deleteTask)

module.exports = router