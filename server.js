const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const db = require('./models/db.js')
const initdb = require('./models/initdb.js')
initdb()

const GITHUB_CLIENT_ID = "fd2a3e52df0f604fd650";
const GITHUB_CLIENT_SECRET = "cc42d06d8cc7129a01b796aa3f4961c5fad1e9a5"

passport.serializeUser(function(user, done) {
    done(null, user)
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  })

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/login/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
))

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

app.use(passport.initialize())
app.use(passport.session())

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