var request = require('superagent');

export default function addcourse(props) {
    return function (dispatch) {
        const [course_code, section_code, term] = props;
        let apiUrl = sessionStorage.getItem('apiurl');
        request
            .post('http://localhost/grading_system/apis/addCourses.php')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                data: JSON.stringify({
                    course_code: course_code,
                    section_code: section_code,
                    term: term,
                    professor_id: "prof145"
                })
            })
            .end((err, res) => {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    if (res.body.code == 200) {
                        alert("Course added successfully")
                        dispatch({
                            type: "UPDATE_DATA",
                            course_code: course_code,
                            section_code: section_code,
                            term: term
                        })
                    }
                    else
                        alert(res.body.message)
                }
            })
    }
}