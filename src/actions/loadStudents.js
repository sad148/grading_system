var request = require('superagent');

export default function loadStudents() {
	return function (dispatch) {
	let grader = sessionStorage.getItem('graderId');
    let apiUrl = sessionStorage.getItem('apiurl');
	request
		.post(apiUrl + 'loadStudents')
        .set('Content-Type', 'application/json')
		.send({grader:grader})
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				console.log(res.body)
				if(res.body.code == 200)
					dispatch({type:"STUDENTSLIST_RECEIVED",payload:res.body.data})
			}
		})	
	}
}