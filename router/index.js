var express = require('express')
var router = express.Router();
var path = require('path')
var register = require('./register/index')
var login = require('./login/index')
var search = require('./search/index')
router.use('/login',login)
router.use('/register',register)
router.use('/search',search)
module.exports = router;
