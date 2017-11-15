var request = require('superagent');

export function run() {
        request
            .post('http://localhost:3009/runStudentCode')
            .send()
            .end()
    }

