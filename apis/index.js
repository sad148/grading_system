const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const updateFeedback = require('./updateFeedback.js');
const loadStudentCode = require('./loadStudentCode.js');

app.use(bodyParser.json());

app.use((req,res,next)=>{	
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
})


app.listen(3009,() => {
	console.log("Listening on 3009");
})

app.post('/updateFeedback',(req,res,next) => {
	updateFeedback.updateFeedback(req,res,(response) => {
		res.send(response);
	})
})

app.get('/loadStudentCode',(req,res,next) => {
	loadStudentCode.loadStudentCode(req,res,(response) => {
		res.send(response);
	})	
})