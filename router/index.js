var express = require('express')
var router = express.Router();
var path = require('path')
var register = require('./register/index')
var login = require('./login/index')
var search = require('./search/index')
var musiclist = require('./musiclist/index')
router.use('/login',login)
router.use('/register',register)
router.use('/search',search)
router.use('/musiclist',musiclist)
module.exports = router;
