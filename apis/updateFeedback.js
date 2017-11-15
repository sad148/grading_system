const fs = require('fs');

function updateFeedback (req,res,cb) {
	let data = req.body.feedback;
	let oldFeedback = data.oldFeedback;
	let newFeedback = data.newFeedback;
	let grades = data.grades;
	let splitFeedback = oldFeedback.split('\n');
	let gradesUpdated = false;
	for(let i = 0;i<splitFeedback.length;i++) {
		if(splitFeedback[i].includes('#READER:')) {
			if(gradesUpdated == false) {
				splitFeedback.splice(i + 1, 0, "Grades - " + grades);
				gradesUpdated = true;				
			}
			for(let j = 0;j < newFeedback.length; j++) {
				let string = newFeedback[j].grade + '\xa0' + newFeedback[j].fullForm;				
				splitFeedback.splice(i + 2,0,string);
			}
			splitFeedback.splice(i + newFeedback.length + 2, 0, "</#READER>");
			break;
		}
	}

	let feedback = splitFeedback.join('\n');

	fs.writeFile('/Users/Ashutosh/Desktop/feedback.txt',feedback,(err) => {
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