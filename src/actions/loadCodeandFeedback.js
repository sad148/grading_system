import store from "../store";

var request = require('superagent');

export default function loadData(student, assignment) {
	return function(dispatch) {
        let apiUrl = sessionStorage.getItem('apiurl');
		request
		.post(apiUrl + 'loadStudentCode')
		.set('Content-Type', 'application/json')
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