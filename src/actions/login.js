var request = require('superagent');

export default function login(username, password) {
    return function (dispatch) {
        request
            .post('http://localhost/grading_system/apis/login.php')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({data: JSON.stringify({username: username, password: password})})
            .end((err, res) => {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    //console.log(res.body)
                    if (res.body.code == 200)
                        dispatch({type: "LOGIN_SUCCESS", payload: username, role: res.body.role})
                    else {
                        alert(res.body.message)
                    }
                }
            })
    }
}