const fs = require('fs');
var async = require('async')

function updateFeedback (req, res, basePath, cb) {
	let data = req.body.feedbackData;
	let oldFeedback = data.oldFeedback;
	let newFeedback = data.newFeedback;
	let grades = data.grades;
	let student = data.student;
	let assignment = data.assignment;
    let codePath = basePath + student + '/' + assignment;
    let feedbackUpdated = data.feedbackUpdated;
    let splitFeedback = oldFeedback.split('\n');
	let gradesUpdated = false;

	if (feedbackUpdated == false) {
	    cb({
            code:200,
            message:"Updated successfully",
            data:{
                feedback:oldFeedback
            }
        })
    } else {
	    let readerIndex = [];
	    let closeReaderIndex;
        for (let i = 0; i < splitFeedback.length; i++) {
            if (i == 0) {
                let insertGrades = splitFeedback[0].split(',');
                insertGrades[1] = grades;
                splitFeedback[0] = insertGrades[0] + ',' + insertGrades[1] + ',' + insertGrades[2];
            } else if (splitFeedback[i].includes('#READER:')) {
                if (gradesUpdated == false) {
                    splitFeedback.splice(i + 1, 0, "Grades - " + grades);
                    gradesUpdated = true;
                }
                for (let j = 0; j < newFeedback.length; j++) {
                    let string = newFeedback[j].grade + '\xa0' + newFeedback[j].fullForm;
                    splitFeedback.splice(i + 2, 0, string);
                }
                closeReaderIndex = i + newFeedback.length + 2;
            } else if (splitFeedback[i].includes('</#READER>')) {
                readerIndex.push(i);
            }
        }

        if(readerIndex.length == 0) {
            splitFeedback[closeReaderIndex] = "</#READER>";
        }

        if (gradesUpdated == false) {
            cb({
                code: 400,
                message: "Feedback format is different"
            })
        } else {
            let feedback = splitFeedback.join('\n');
            fs.readdir(codePath, (err, folders) => {
                if (err) {
                    cb({
                        code: 400,
                        message: "Error in finding assignment folder",
                        data: err
                    })
                } else {
                    for (let i = folders.length - 1; i >= 0; i--) {
                        let directoryCheck = fs.lstatSync(codePath + '/' + folders[i]).isDirectory();
                        if (directoryCheck) {
                            var path = codePath + '/' + folders[i];
                            break;
                        }
                    }

                    let pathArr = [path, codePath]		//file paths
                    async.map(pathArr, (filePath, cb1) => {		//filePath = iteratee
                        fs.writeFile(filePath + '/feedback.txt', feedback, (err) => {
                            if (err) {
                                cb({
                                    code: 400,
                                    message: "Error in writing file",
                                    data: err
                                })
                            } else {
                                cb1();
                            }
                        })
                    }, (cb1) => {
                        cb({
                            code: 200,
                            message: "Success",
                            data:{
                                feedback:feedback
                            }
                        })
                    })
                }
            })
        }
    }
}

module.exports.updateFeedback = updateFeedback;