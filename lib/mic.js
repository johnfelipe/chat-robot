"use strict";
var mic = require('mic');

var Mic = module.exports = function() {
	this.micInstance = mic({
		'rate': '16000',
		'channels': '1',
		'debug': false,
		'exitOnSilence': 6
	});
	this.micInputStream = this.micInstance.getAudioStream();
};

Mic.prototype.init = function() {
	var self = this;

	self.micInstance.start();
};
