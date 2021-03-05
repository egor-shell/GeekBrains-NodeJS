const cons = require('consolidate')
const mysql = require('mysql2')
const config = require('./config/mysqlcfg')

const pool = mysql.createPool(config.options)

let tasks

pool.getConnection((err, con) => {
    if (err) {
        console.log(err)
    } else {
        con.query('select * from tasks', (err, res) => {
            if (err) {
                console.log(err)
            } else {
                tasks = res
                console.log(tasks[0].ID_Task)
            }
        })
        con.release()

        pool.end()
    }
})
