const fs = require('fs');

function loadStudentCode (req,res,basePath,cb) {
	let student = req.body.student;
	let assignment = req.body.assignment;
	let codePath = basePath + student + '/' + assignment;
    let code;
    code = "";
    let feedback = "";
    let grades = 100;
    let path = false;

    fs.readFile(codePath + '/feedback.txt', 'utf-8', (err, feedbackFileResp) => {
        if (err) {
            let response = {
                code:400,
                message:"Assignment folders not present"
            };
            cb(response);
        } else {
            feedbackFileResp = feedbackFileResp.split('\n');
            let feedbackSplit = feedbackFileResp[0].split(',')
            if (feedbackSplit[0] == 0) {
                let response = {
                    code:400,
                    message:"No assignments uploaded"
                };
                cb(response);
            } else {
                fs.readdir(codePath, (err,folders) => {
                    if(err) {
                        let response = {
                            code: 400,
                            message: "Assignment folders not present"
                        };
                        cb(response);
                    } else {
                        for (let i = folders.length - 1; i>=0; i--) {
                            let directoryCheck = fs.lstatSync(codePath + '/' + folders[i]).isDirectory();
                            if (directoryCheck) {
                                let latestFolder = folders[i];
                                if (latestFolder > feedbackSplit[0]) {
                                    let response = {
                                        code: 400,
                                        message: "Latest assignment is not graded"
                                    };
                                    cb(response);
                                } else if (latestFolder == feedbackSplit[0]) {
                                    path = codePath + '/' + latestFolder
                                }
                                break;
                            }
                        }
                        if (path == false) {
                            cb({
                                code: 400,
                                message: "Code not present"
                            })
                        } else {
                            fs.readdir(path, (err, files) => {
                                for (let j = files.length - 1; j >= 0; j--) {
                                    if (files[j].includes(".java")) {
                                        code = fs.readFileSync(path + '/' + files[j], 'utf-8');
                                        break;
                                    }
                                }

                                let feedbackFileExists = fs.existsSync(path + '/feedback.txt');
                                if (feedbackFileExists) {
                                    feedback = fs.readFileSync(path + '/feedback.txt', 'utf-8');
                                    grades = feedback.split('\n');
                                    grades = grades[0];
                                    grades = grades.split(',');
                                    grades = grades[1]
                                }
                                cb({
                                    code: 200,
                                    message: "Success",
                                    data: {
                                        code: code,
                                        feedback: feedback,
                                        grades: grades
                                    }
                                })
                            })
                        }
                    }
                })
            }
        }
    })

    // fs.readdir(codePath, (err, folders) => {
    //     if(err) {
    //         let response = {
    //             code:400,
    //             message:"Assignment folders not present"
    //         };
    //         cb(response);
    //     } else {
    //         for(let i = folders.length - 1;i >= 0 ; i--) {
    //             let directoryCheck = fs.lstatSync(codePath + '/' + folders[i]).isDirectory();
    //             if (directoryCheck) {
    //                 path = codePath + '/' + folders[i];
    //                 break;
    //             }
    //         }
    //
    //
    //     }
    // })
}

module.exports.loadStudentCode = loadStudentCode;