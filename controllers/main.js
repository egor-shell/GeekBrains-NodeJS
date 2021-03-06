exports.indexPage = (req, res, next) => {
    res.render('index.hbs', { title: 'Task App', message: 'Hello, World!' })
}