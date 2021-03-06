const express = require('express');
const controllers = require('../controllers')

const router = express.Router()

router.get('/auth/login/', controllers.auth.getLogin);
router.post('/auth/login/', controllers.auth.postLogin);
router.post('/auth/logout/', controllers.auth.postLogout);
router.get('/auth/signup/', controllers.auth.getSignup);
router.post('/auth/signup/', controllers.auth.postSignup);

module.exports = router;