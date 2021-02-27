const handlebars = require("handlebars")
const templating = require('consolidate')
const cookieParser = require('cookie-parser')
const yandexTranslate = require('./yandexTranslate')
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
  console.log('Cookies: ', req.cookies)
  res.redirect('/translate.html')
})

app.post('/translate', (req, res) => {
  console.log(req.cookies)
  const body = req.body
  yandexTranslate({
    texts: [body.text],
    sourceLanguageCode: body.sourceLanguageCode,
    targetLanguageCode: body.targetLanguageCode
  }).then((result) => {
    res.render('translate', { 
      answer: result.data.translations[0].text,
      questions: body.text
    })
  })
})

app.listen(port, () => {
  console.log(`Приложение запущено по адресу http://localhost:${port}`)
})