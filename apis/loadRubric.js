const fs = require('fs');

function loadRubric(req,res,cb) {
	fs.readFile('H:/Rubrik.txt','utf-8',(err,res) => {
		if(err) {
			cb({
				code:400,
				message:"Error in reading file",
				data:err
			})
		} else {
			cb({
				code:200,
				message:"Success",
				data:res
			})
		}		
	})
}

module.exports.loadRubric = loadRubric;