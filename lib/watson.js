"use strict";
var watson = require('watson-developer-cloud');

var Watson = module.exports = function(watson_username, watson_passwd) {
	this.speech_to_text = watson.speech_to_text({
		username: watson_username,
		password: watson_passwd,
		version: 'v1'
	});
	this.params = {
		content_type: 'audio/wav; rate=44100',
		model: 'zh-CN_BroadbandModel',
		continuous: true,
		max_alternatives: 10
	};
	this.stt = this.speech_to_text.createRecognizeStream(this.params);
	this.stt.setEncoding('utf8');
};
