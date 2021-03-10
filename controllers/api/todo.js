const models = require('../../models')

exports.getTasks = (req, res, next) => {
    models.Task.getTasks().then(([rows]) => {
        res.json({ task: rows})
    })
}

exports.createTask = (req, res, next) => {
    models.Task.createTask(req.body).then(([rows]) => {
        res.json({ Status: "Created task", taskId: rows.insertId });
    })
}

exports.updateNameTask = (req, res, next) => {
    models.Task.updateNameTask(req.params.ID_Task, req.body).then(([rows]) => {
        res.json({ Status: "Created task", taskId: rows.NAME_TASK })
    })
}
exports.completeTask = (req, res, next) => {
    models.Task.completeTask(req.params.taskId, req.body).then(([rows]) => {
        res.json({Status: 'Complete', taskId: rows.insertId})
    })
}
exports.deleteTask = (req, res, next) => {
    models.Task.deleteTask(req.params.taskId).then(([rows]) => {
        res.json({Status: 'Task delete', taskId: rows.insertId})
    })
}