var request = require('superagent');

export default function loadData() {
	return function(dispatch) {
		request
		.get('http://localhost:3009/loadStudentCode')		
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				console.log("Response",res.body.data);
				dispatch({type:"CODEFEEDBACKRECEIVED" ,feedback:res.body.data.feedback, code:res.body.data.code});
			}
		})
	}
}