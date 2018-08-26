var express = require('express')
var mysql = require('mysql')
var app = express()
var router = express.Router();
var path = require('path')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var connection = mysql.createConnection({
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : 'dlwjdwo95!',
  database : 'sogongdb'
})
connection.connect();
router.post('/', upload.single('record'), function(req, res){
  console.log(req.file);
});
/*
  var body = req.body;
  var id = body.ID;
//  var record = body.record;
  var date = body.date;
  var name = body.name;

  app.use(multer({
    onFileUp
  }))
  console.log(body);
  var PythonShell = require('python-shell');

  var options={
    mode : 'json',
    pythonPath : '',
    pathonOptions : ['-u'],
    scriptPath : ''.
    args : [record]
  };

  PythonShell.run('.py', options, function (err, results) {
    if(err) throw err;

    console.log('results : %s', results);
  });
  /*
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

})*/
module.exports = router;
