const db = require('./db.js')
const config = require('../config')

class Task {
    static async getTasks() {
        const tasks = await db.query('SELECT * FROM tasks')
        return tasks
    }
    static async deleteTask(taskId) {
        const res = await db.query('DELETE FROM tasks WHERE ID_Task = ?', [taskId])
        console.log('DATABASE')
        return res
    }
    static async createTask(task) {
        const newTask = await db.query('INSERT INTO tasks(NAME_Task) VALUES (?)', [task.NAME_Task]);
        return newTask;
    }
    static async updateNameTask(taskId, task) {
        const res = await db.query('UPDATE tasks SET NAME_Task = ? WHERE id = ?', [task.NAME_Task, taskId])
        return res
    }
}

module.exports = Task;