var request = require('superagent');

export function update(value,cb) {
	request
		.post('http://localhost:3009/updateFeedback')
		.send({feedback:value})
		.end((err,res) => {
			if(err) {
				cb(err);
			}
			else {
				cb(res.body.code);
			}
		})
}
//module.exports.update = update;