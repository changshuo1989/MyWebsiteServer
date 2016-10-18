var express = require('express');
var bodyParser = require("body-parser");
var app=express();
var mongoClient = require('mongodb').MongoClient;

var port=3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', function(req, res){
  var finished=false;
  
 // var firstname=req.params.firstname;
 // var lastname=req.params.lastname;
 // var email=req.params.email;
 // var phone=req.params.phone;
 // var message=req.params.message;
 // console.log(firstname+" "+lastname+" "+email+" "+phone+" "+message);

  //console.log(req.body);
  if(req.body!==null){
    mongoClient.connect('mongodb://localhost:27017/contact', function(err,db){
      if(err){
        throw err;
      }

      console.log('Connected to Database');
      db.collection('contact').insert(req.body, function(err, records){
        if(err){
          throw err;
        }
        console.log('Record added');
      });
    
    });
  }
  finished=true;
  res.send(finished);

});

app.listen(port, function(){
  console.log('my blog server is listening on port: %s', port);

});

