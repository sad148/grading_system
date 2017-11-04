const fs = require('fs');

function loadStudentCode (req,res,cb) {
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
}

module.exports.loadStudentCode = loadStudentCode;