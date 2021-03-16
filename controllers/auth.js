const models = require('../models')
const config = require('../config')

exports.getLogin = (req, res, next) => {
    res.render('login', {
        username: req.cookies ? req.cookies.user || '' : ''
    })
}

exports.postLogin = (req, res, next) => {
    const user = models.User.findUserByName(req.body.username).then (([user, fieldData]) => {
        if (user.length > 0) {
            user = user[0]
            console.log(user)

            if (models.User.checkPassword(user, req.body.password)) {
                if (req.body.save) {
                    res.cookie('user', req.body.username)
                }
                req.session.username = req.body.username

                res.redirect('/')
            } else {
                res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getSignup = (req, res, next) => {
    res.render('signup', {})
}
exports.postSignup = (req, res, next) => {
    models.User.createUser(req.body)
    res.redirect('/auth/login')
}

exports.github = (req, res, next) => {
    console.log(req.user)
    req.session.username = req.user._json.login
    console.log(req.session.username)
    res.cookie('user', req.user._json.login)
    models.User.createUser(req.user)
    res.redirect('/')
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/')
}