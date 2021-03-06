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
  //const respond = (token) => {
  var searchQuery = connection.query('select * from music where ID = ?',[id], function(err,rows){
    if(err) throw err
    if(rows.length < 1)
    {
      var msg = {"status": "ERROR"}
      res.json(msg)
      return;
    }
    else {
      console.log(rows.length)
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
//  }
})
module.exports = router;
