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
router.post('/store',function(req, res){
  var body = req.body;
  var id = body.ID;
  var name = body.name;
  var date = body.date;
  var data = body.data;

  console.log(body);
  var sql = {"ID":id,"name":name,"date":date,"data":data};
  var registerquery = connection.query('insert into sheet set ?',sql, function(err,rows){
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
router.post('/load',function(req, res){
  var body = req.body;
  var name = body.name;

  var searchQuery = connection.query('select * from sheet where name = ?',[name], function(err,rows){
    if(err) throw err
    if(rows.length < 1)
    {
      var msg = {"status": "ERROR"}
      res.json(msg)
      return;
    }
    else {
      var id = row[0].ID;
      var name = row[0].name;
      var date = row[0].date;
      var data = row[0].data;
      var respone = {'status':'OK','ID':id,'name':name,'date':date,'data':data}
      res.json(respone);
      return;
     }
   })
})
module.exports = router;
