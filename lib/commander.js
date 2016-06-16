"use strict";
var request = require('request');
var MQTT = require('./mqtt');

var Commander = module.exports = function(IoT) {
	this.mqtt = new MQTT(IoT);
};

Commander.prototype.init = function() {
	var self = this;

	self.mqtt.init();
};

Commander.prototype.MQTT = function(motion) {
	var self = this;

	self.mqtt.iot_client.publish('iot-2/evt/I2C/fmt/number', motion.toString());
};

Commander.prototype.HTTP = function(http, motion) {
	var self = this;
	var url = http.host + ':' + http.port + '/?' + http.uri + '=' + motion;

	request
		.get({
			url: url,
		})
		.on('error', function (err) {
			console.log(err);
		})
};
