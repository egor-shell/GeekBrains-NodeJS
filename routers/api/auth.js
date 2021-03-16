  
const express = require('express');
const controllers = require('../../controllers');

const router = express.Router();

router.post('auth/login/', controllers.api.auth.postLogin);
router.post('auth/logout/', controllers.api.auth.postLogout);
router.post('auth/signup/', controllers.api.auth.postSignup);


module.exports = router