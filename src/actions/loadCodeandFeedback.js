import store from "../store";

var request = require('superagent');

export default function loadData(student, assignment) {
	return function(dispatch) {
		request
		.post('http://localhost:3009/loadStudentCode')
        .send({student:student, assignment:assignment})
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				if(res.body.code == 200) {
				    dispatch({type:"CODERECEIVED" , code:res.body.data.code});
				    dispatch({type:"FEEDBACKRECEIVED" ,feedback:res.body.data.feedback});
				    dispatch({type:"GRADESRECEIVED", grades:res.body.data.grades});
                }
				else
				    dispatch({type:"ASSIGNMENT_FOLDER_NOT_FOUND"});
			}
		})
	}
}