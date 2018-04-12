var request = require('superagent');

function adddata(props, dataType, dataArr, dispatch) {
    const {course_code, section_code, term, assignment_id} = props;
    let apiUrl = sessionStorage.getItem('apiurl');
    let url = ""
    if (dataType === "graders") {
        url = 'http://localhost/grading_system/apis/addGraders.php'
    } else if (dataType === "students") {
        url = 'http://localhost/grading_system/apis/addStudents.php'
    } else if (dataType === "assignments") {
        url = 'http://localhost/grading_system/apis/addAssignments.php'
    } else if (dataType === "rubric") {
        url = 'http://localhost/grading_system/apis/addRubrics.php'
    }
    request
        .post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            data: JSON.stringify({
                course_code: course_code,
                section_code: section_code,
                assignment_id: assignment_id || "",
                term: term,
                [dataType]: dataArr
            })
        })
        .end((err, res) => {
            if (err) {
                alert("Error in adding data. Please try again later")
            }
            else {
                if (res.body.code == 200) {
                    alert(dataType + " added successfully")
                    dispatch({type: "DATA_APPEND", dataReceived: true, payload: dataArr, dataType: dataType})
                }
                else
                    alert(res.body.message);
            }
        })
}

module.exports.adddata = adddata;