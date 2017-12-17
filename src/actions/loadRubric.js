var request = require('superagent');

export default function loadRubric() {
	return function (dispatch) {
	console.log("inside loadRubric")
	let apiUrl = sessionStorage.getItem('apiurl');
	request
		.get(apiUrl + 'loadRubric')
        .set('Content-Type', 'application/json')
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				if(res.body.code == 200)
					dispatch({type:"RUBRICDATA_RECEIVED",payload:res.body.data})
			}
		})	
	}
}