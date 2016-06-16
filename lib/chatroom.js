"use strict";
var request = require('request');

var Chatroom = module.exports = function(Room) {
	this.host = Room.host,
	this.port = Room.port,
	this.uri = Room.uri
};

Chatroom.prototype.openlab = function(str) {
	var self = this;
	var url = self.host + ':' + self.port + '/' + self.uri;

	request
		.post({
			url: url,
			form: {msg:str}
		})
		.on('error', function (err) {
			console.log(err);
		})
};
