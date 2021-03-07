const db = require('./db.js')
const config = require('../config')
const fs = require('fs')
const bcryptjs = require('bcryptjs')

class User {
    static async init() {
        if (config.db.cleanOnStartup) {
            await db.execute('DROP TABLE IF EXISTS `users`')
        }

        await db.execute(`CREATE TABLE users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(45) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
        )`)

        if (config.db.loadMockupData) {
            const mockups = JSON.parse(fs.readFileSync('./models/mockups/user.json', 'utf-8'))
            mockups.forEach(async (item) => {
                await User.createUser(item)
            })
        }

        console.log('Таблица пользователей проинициализирована')
    }

    static async createUser(user) {
        const login = user.username || user._json.login
        let password = user.password || user._json.id
        password = String(password)
        const email = user.email || user._json.email || 'index@email.com'
        const salt = bcryptjs.genSaltSync(config.bcryptjs.saltRounds)
        password = bcryptjs.hashSync(password, salt)

        const newUser = await db.query('INSERT INTO users(username, password, email) VALUES (?, ?, ?)', [login, password, email])
        return newUser
    }

    static async findUserByName(name) {
        const user = await db.query('SELECT * from users WHERE username = ?', [name]);
        return user;
    }

    static checkPassword(user, password) {
        return bcryptjs.compareSync(password, user.password);
    }
}

module.exports = User