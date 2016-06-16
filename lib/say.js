"use strict";
var request = require('request');
var querystring = require('querystring');
var Mpg = require('mpg123');
var fs = require('fs');

var Say = module.exports = function(passwd) {
	this.voicerss_passwd = passwd
};

Say.prototype.voicerss = function(str) {
	var self = this;
	var writeStream = fs.createWriteStream('./tts.mp3');
	var params = {
		key: self.voicerss_passwd,
		ie: 'UTF-8',
		src: str,
		r: 3, // The speech rate (speed): from -10 (slowest speed) up to 10 (fastest speed)
		c: 'MP3', // Audio Codecs: MP3, WAV, AAC, OGG, CAF
		f: '44khz_16bit_stereo', // Audio Formats: 8khz_8bit_mono, 8khz_16bit_stereo ....
		hl: 'zh-tw'
	};

	writeStream
		.on('finish', function() {
			var player = new Mpg();
			player.play('./tts.mp3');
		});

	request
		.get({
			url: 'http://api.voicerss.org/?' + querystring.stringify(params),
		})
		.on('error', function (err) {
			console.log(err);
		})
		.pipe(writeStream);
};
