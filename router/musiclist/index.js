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
  var token = body.token;
  const respond = (token) => {
  var searchQuery = connection.query('select * from music where ID = ?',[token.data],function(err,rows){
    if(err)
    {
      console.log(err)
      res.json({"status":"ERROR"})
    }
    else {
      var jsonArray = new Array();
      for(var i = 0 ; i < rows.length ; i++)
      {
        var json = new Object();
        json.ID = rows[i].ID;
        json.title = rows[i].title;
        json.artist = rows[i].artist;
        json.date = rows[i].date;
        json.image = rows[i].image;
        json.lyric = rows[i].lyric;

        jsonArray.push(json);
      }

     res.send(JSON.parse(JSON.stringify(jsonArray)));
    }
  })
  }
})
module.exports = router;
