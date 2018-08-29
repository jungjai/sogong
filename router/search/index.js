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
  var title = body.title;
  var artist = body.artist;
  var date = body.date;
  var image = body.image;
  var lyric = body.lyric;

  console.log(body);
  var sql = {"ID":id,"title":title,"artist":artist,"date":date,"image":image,"lyric":lyric};
  var registerquery = connection.query('insert into music set ?',sql, function(err,rows){
    if(err){
      console.log(err)
      var msg = {"status": "ERROR"}
      res.json(msg)
      return;
    }
    else {
      var msg = {"status":"OK"}
      res.json(msg)
    }
  })
})
module.exports = router;
