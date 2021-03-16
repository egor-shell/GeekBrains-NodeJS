const models = require('../../models')

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
                res.json({title: "Completed login", user: req.body.user})
            } else {
                res.json({ title: "Incorrected password"})
            }
        } else {
            res.json({ title: "Incorrected username" })
        }
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.json({title: "Completed logout"});
    })
}

exports.postSignup = (req, res, next) => {
    res.cookie('user', req.body.user);
    models.User.createUser(req.body);
    res.json({title: "Created new user", user: req.body.user});
}