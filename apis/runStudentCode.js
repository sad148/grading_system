const shell = require('shelljs');

function runStudentCode(req,res,cb) {
    shell.cd('/Users/Ashutosh/Desktop');
    shell.exec('./first.sh');

}

module.exports.runStudentCode = runStudentCode;