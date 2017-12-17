var request = require('superagent');

export function update(value,cb) {
	request
		.post('http://192.168.99.100:49160/updateFeedback')
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