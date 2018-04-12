var request = require('superagent');

export function update(value,cb) {
    let apiUrl = sessionStorage.getItem('apiurl');
	request
		.post('http://localhost/updateFeedback.php')
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send(value)
		.end((err,res) => {
			if(err) {
				cb(err);
			}
			else {
				res.body = JSON.parse(res.text)
				cb(res.body);
			}
		})
}
//module.exports.update = update;