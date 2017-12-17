let request = require('superagent')

export function downloadFile(student, assignment, cb) {
    request.post('http://localhost:3009/createzip')
    		.send({student:student, assignment:assignment})
			.set('Content-Type', 'application/json')
            .end((err, res) => {
                if(res && res.statusCode == 200) {
                    cb(true);
                } else {
                    cb(false);
                }
            })
}