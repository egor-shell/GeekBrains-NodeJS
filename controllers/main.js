exports.indexPage = (req, res, next) => {
    console.log(req.session.username)
    res.render('index.hbs', { username: req.session.username })
}