const { task } = require('../../HomeWork_Example/nodeHW6/controllers')
const models = require('../models')

exports.todoPage = (req, res, next) => {
    if (!req.session.username) {
        console.log(req.session)
        res.redirect('/auth/login')
    } else {
        models.Task.getTasks().then(([rows, fieldData]) => {
            res.render('todo', { task: rows})
        })
    }
}

exports.createTask = (req, res, next) => {
    models.Task.createTask(req.body).then(([rows, fieldData]) => {
        res.redirect('/todo/');
    })
}

exports.updateNameTask = (req, res, next) => {
    models.Task.updateNameTask(req.params.ID_Task, req.body).then(([rows, fieldData]) => {
        res.redirect('/todo/')
    })
}

exports.deleteTask = (req, res, next) => {
    models.Task.deleteTask(req.params.ID_Task).then(([rows, fieldData]) => {

        res.redirect('/todo/')
    })
}