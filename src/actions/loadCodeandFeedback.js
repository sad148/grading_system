var request = require('superagent');

export function loadData(cb) {
	request
		.get('http://localhost:3009/loadStudentCode')		
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				console.log("Response",res.body.data);
				cb(res.body.data);
			}
		})
}

//module.exports.loadData = loadData;