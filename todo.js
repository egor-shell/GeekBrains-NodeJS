const handlebars = require("handlebars")
const templating = require('consolidate')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 8080

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

templating.requires.handlebars = handlebars

app.engine('hbs', templating.handlebars)
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  res.cookie()
  res.redirect('/todo.html')
})

app.post('/translate', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Приложение запущено по адресу http://localhost:${port}`)
})