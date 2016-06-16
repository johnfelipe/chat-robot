"use strict";
var mqtt = require('mqtt');

var MQTT = module.exports = function(IoT) {
	this.clientId = ['d', IoT.domain, IoT.name, IoT.id].join(':');
	this.iot_client = mqtt.connect('mqtt://' + IoT.domain +'.messaging.internetofthings.ibmcloud.com:1883',
						  {
							  "clientId" : this.clientId,
							  "keepalive" : 30,
							  "username" : "use-token-auth",
							  "password" : IoT.passwd
						  });
};

MQTT.prototype.init = function(callback) {
	var self = this;
	self.iot_client.on('connect', function() {
		self.iot_client.publish('iot-2/evt/status/fmt/json', '{"d":{"status": "connected" }}');
	});
};
