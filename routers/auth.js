const express = require('express');
const controllers = require('../controllers')
const passport = require('passport')

const router = express.Router()

router.get('/auth/login/', controllers.auth.getLogin);
router.post('/auth/login/', controllers.auth.postLogin);
router.post('/auth/logout/', controllers.auth.postLogout);
router.get('/auth/signup/', controllers.auth.getSignup);
router.post('/auth/signup/', controllers.auth.postSignup);
router.get('/auth/login/github', passport.authenticate('github'));
router.get('/auth/login/github/callback', passport.authenticate('github'), controllers.auth.github)
router.get('/logout', controllers.auth.logout)

module.exports = router;