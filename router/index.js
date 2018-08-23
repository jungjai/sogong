var express = require('express')
var router = express.Router();
var path = require('path')
var register = require('./register/index')
var login = require('./login/index')

router.use('/login',login)
router.use('/register',register)

module.exports = router;
