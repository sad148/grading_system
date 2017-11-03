const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

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
	let feedback = req.body.feedback;
	fs.writeFile('feedback.txt', feedback, (err) => {
		if(err) {
			res.send({
				code:400,
				message:"Error in writing file",
				data:err
			})			
		}
		else {
			res.send({
				code:200,
				message:"Success"
			})			
		}
	})	
})

app.get('/loadStudentCode',(req,res,next) => {
	let code = fs.readFileSync('H:/test1.java','utf-8');
	let feedback = fs.readFileSync('H:/feedback.txt','utf-8');
	res.send({
		code:200,
		message:"Success",
		data:{
				code:code,
				feedback:feedback
			}
		
	})
})