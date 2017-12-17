var request = require('superagent');

export function update(value,cb) {
    let apiUrl = sessionStorage.getItem('apiurl');
	request
		.post(apiUrl + 'updateFeedback')
		.set('Content-Type', 'application/json')
		.send({feedbackData:value})
		.end((err,res) => {
			if(err) {
				cb(err);
			}
			else {
				cb(res.body);
			}
		})
}
//module.exports.update = update;