var express = require('express')

var router = express.Router()
var todo = require('./api/todo.route')


router.use('/todo', todo);


module.exports = router;