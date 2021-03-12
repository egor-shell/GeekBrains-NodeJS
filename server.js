const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const db = require('./models/db.js')
const initdb = require('./models/initdb.js')
initdb()

const express = require('express')

const app = express()

const http = require('http').createServer(app)

const io = require('socket.io')(http)

app.use(express.static(__dirname+'/public'))

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db)
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 }
});

app.use(sessionMiddleware)

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next)
});

io.on('connection', socket => {
  if (!socket.request.session || !socket.request.session.username) {
    console.log('Unauthorised user connected!')
    socket.disconnect();
    return;
  }

  console.log('Chat user connected:', socket.request.session.username)

  socket.on('disconnect', () => {
    console.log('Chat user disconnected:', socket.request.session.username)
  })

  socket.on('chatMessage', (data) => {
    console.log('Chat message from', socket.request.session.username+':', data)
    data.message = socket.request.session.username + ': ' + data.message
    io.emit('chatMessage', data)
    // console.log(io.sockets.sockets);
  })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const templating = require('consolidate')
const handlebars = require('handlebars')
templating.requires.handlebars = handlebars

app.engine('hbs', templating.handlebars)
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

const GITHUB_CLIENT_ID = "fd2a3e52df0f604fd650";
const GITHUB_CLIENT_SECRET = "cc42d06d8cc7129a01b796aa3f4961c5fad1e9a5"

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/login/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    
    return done(null, profile);
  })
}))

const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

const router = require('./routers')

app.use(router)

const port = 8080

http.listen(port, () => {
    console.log('Server listening on 8080 port.')
})
