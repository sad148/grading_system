var request = require('superagent');

export default function loadAssignmentsList() {
    return function (dispatch) {
        let apiUrl = sessionStorage.getItem('apiurl');
        console.log("inside loadAssignmentsList")
        request
            .post(apiUrl + 'loadAssignmentsList')
            .set('Content-Type', 'application/json')
            .send({grader:"grader1"})
            .end((err,res) => {
                if(err) {
                    console.log("Error",err);
                }
                else {
                    console.log(res.body)
                    if(res.body.code == 200)
                        dispatch({type:"ASSIGNMENTSLIST_RECEIVED",payload:res.body.data})
                }
            })
    }
}