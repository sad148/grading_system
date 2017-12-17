const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const updateFeedback = require('./updateFeedback.js');
const loadStudentCode = require('./loadStudentCode.js');
const loadRubric = require('./loadRubric.js');
const loadStudents = require('./loadStudents.js');
const loadAssignmentsList = require('./loadAssignmentsList.js');
const downloadFile = require('./downloadFile.js');
var cors = require('cors');

const basePath = __dirname + '/401-handin/'

app.use(bodyParser.json());
app.use(cors())

app.listen(3009,() => {
    console.log("Listening on 3009");
})

app.get("/test", (req, res, next) => {
	res.send("Grading System is up");
})

app.post('/loadStudents', (req,res,next) => {
	loadStudents.loadStudents(req,res,basePath,(response) => {
		res.send(response);
	})
})

app.post('/loadAssignmentsList', (req,res,next) => {
    loadAssignmentsList.loadAssignmentsList(req,res,basePath,(response) => {
        res.send(response);
    })
})

app.post('/createzip', (req,res,next) => {
    downloadFile.downloadFile(req, res, basePath, (response) => {
    	res.send(response);
    })
})

app.get('/download/:student/:assignment', (req, res, next) => {
	let student = req.params.student
	let assignment = req.params.assignment
	let file = basePath + student + '/' + assignment + '/' + student +'.zip';
	res.download(file);
})

app.post('/updateFeedback',(req, res, next) => {
	updateFeedback.updateFeedback(req, res, basePath,(response) => {
		res.send(response);
	})
})

app.post('/loadStudentCode',(req,res,next) => {
	loadStudentCode.loadStudentCode(req,res,basePath,(response) => {
		res.send(response);
	})	
})

app.get('/loadRubric',(req,res,next) => {
	loadRubric.loadRubric(req, res, basePath, (response) => {
		res.send(response);
	})
})