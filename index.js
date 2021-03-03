const cons = require('consolidate')
const mysql = require('mysql2')
const config = require('./config/mysql-cfg')

const pool = mysql.createPool(config.options)

pool.getConnection((err, con) => {
    if (err) {
        console.log(err)
    } else {
        con.query('select * from address limit 10, 10', (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
        con.release()

        pool.end()
    }
})
