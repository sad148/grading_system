const fs = require('fs');

function updateFeedback (req,res,cb) {
	let feedback = req.body.feedback;
	fs.writeFile('feedback.txt', feedback, (err) => {
		if(err) {
			cb({
				code:400,
				message:"Error in writing file",
				data:err
			})					
		}
		else {
			cb({
				code:200,
				message:"Success"
			})			
		}
	})	
}

module.exports.updateFeedback = updateFeedback;