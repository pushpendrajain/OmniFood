var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/omnifoodDB', {useNewUrlParser: true});
var nodemailer = require('nodemailer');
var app = express();
var path=require('path');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    
  }
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname+"/")));
app.get("/",function(request,response){
  response.sendFile(__dirname + "/index.html");
});

const feedbackSchema=new mongoose.Schema({
  name:String,
  email:String,
  findus:String,
  newsletter:Boolean,
  feed:String
});

	var User=mongoose.model("User", feedbackSchema);

const loginSchema=new mongoose.Schema({
  name:String,
  email:String,
  plan:String,
  newsletter:Boolean,
  address:String
});

	var NewUser=mongoose.model("NewUser", loginSchema);


app.get("/form",function(req,res){
	res.send(html);
});

app.get('/send',function(req,res){
    var mailOptions={
        from: "Solar Panel",
        to : req.query.to,
        subject : "Welcome to Solar World",
        text : "Thank you for your feed back. We are commited to serve you better"
    };

     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
 });

app.get('/signup/send',function(req,res){
    var mailOptions={
        from: "Solar Panel",
        to : req.query.to,
        subject : "Sign Up Alert",
        text : "Thank for SignUp with Omni Food. We look forward to serve you with the best deals around the year."
    };

     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
 });


app.post("/",function(req,res){



  var myData=new User({
	  name:req.body.name,
  	 email:req.body.email,
  	findus:req.body.findus,
   newsletter:true,
   feed:req.body.feedback
  });
  
//  res.sendFile(__dirname+"/index.html");
	console.log("Submitted");


myData.save(function(error){
	res.sendFile(__dirname + "/index.html");
	if(error){
		res.status(400),sendFile(__dirname + "/index.html");
	}
});
});


app.post("/signup/",function(req,res){

  var myData=new NewUser({
	  name:req.body.name,
  	 email:req.body.email,
  	plan:req.body.plan,
   newsletter:true,
   address:req.body.address
  });
  
//  res.sendFile(__dirname+"/index.html");
	console.log("Submitted");


myData.save(function(error){
	res.sendFile("../" + __dirname + "/index.html");
	if(error){
		res.status(400),sendFile("../" + __dirname + "/index.html");
	}
});
});
	
app.listen(3000,function(){
  console.log("server is started on port 3000");
});


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $(".g-signin2").css("display","none");
    $(".data").css("display","block");
    $("#pic").attr('src',profile.getImageUrl());
    $("#email").text(profile.getEmail());


      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
  }

  function signOut(){
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
      }
  }



//
//const findDocuments = function(db, callback) {
//  const collection = db.collection('fruits');
//  collection.find({}).toArray(function(err, fruitArray) {
//    assert.equal(err, null);
//    console.log("Found the following records");
//    console.log(fruitArray)
//    callback(fruitArray);
//  });
//};
