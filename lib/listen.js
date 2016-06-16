"use strict";
var WavStream = require('./wav_stream');

var Listen = module.exports = function() {
	this.pcm2wav = new WavStream({
		channels: 1,
		sampleRate: 16000
	});
};
