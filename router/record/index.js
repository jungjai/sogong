var express = require('express')
var mysql = require('mysql')
var app = express()
var router = express.Router();
var path = require('path')
var connection = mysql.createConnection({
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : 'dlwjdwo95!',
  database : 'sogongdb'
})
connection.connect();
router.post('/',function(req, res){
  var body = req.body;
  var id = body.ID;
  var record = body.record;
  var date = body.date;
  var name = body.name;

  console.log(body);
  var sql = {"ID":id,"record":record,"date":date,"name":name}
  var registerquery = connection.query('insert into record set ?',sql, function(err,rows){
    if(err){
      console.log(err)
      var msg = {"status": "ERROR"}
      res.json(msg)
      return;
    }
    var msg = {"status":"OK"}
    res.json(msg)
  })
})
module.exports = router;
