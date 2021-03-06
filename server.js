const db = require('./models/db.js')
const initdb = require('./models/initdb.js')
initdb()

const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

const session = require('express-session')
const sessionStore = new (require('express-mysql-session')(session))({}, db)
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 }
})

app.use(sessionMiddleware)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const templating = require('consolidate')
const handlebars = require('handlebars')
templating.requires.handlebars = handlebars

app.engine('hbs', templating.handlebars)
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

const router = require('./routers')
app.use(router)

const port = 8080

app.listen(port, () => {
    console.log(`Приложение запущено по адресу http://localhost:${port}`)
})