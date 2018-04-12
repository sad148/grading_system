var request = require('superagent');

export default function get(props, type) {
    return function (dispatch) {
        console.log(props)
        const {course_code, section_code, term, assignment_id} = props;
        let apiUrl = sessionStorage.getItem('apiurl');
        request
            .post('http://localhost/grading_system/apis/getDetails.php')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                data: JSON.stringify({
                    course_code: course_code,
                    section_code: section_code,
                    assignment_id: assignment_id || "",
                    term: term,
                    type: type
                })
            })
            .end((err, res) => {
                if (err) {
                    alert("Error in getting data. Please try again later.")
                    console.log("Error", err);
                }
                else {
                    console.log(res.body)
                    if (res.body.code == 200) {
                        console.log("inside red body");
                        dispatch({type: "DATA_RECEIVED", payload: res.body.data, dataType: type})
                    }
                    else {
                        alert(res.body.message);
                    }
                }
            })
    }
}