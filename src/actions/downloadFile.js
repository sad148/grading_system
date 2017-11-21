let request = require('superagent')

export function downloadFile(cb) {
    request.get('http://localhost:3009/download')
            .end((err, res) => {
                if(res && res.statusCode == 200) {
                    cb(true);
                } else {
                    cb(false);
                }
            })
}