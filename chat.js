"use strict";

var Listen = require('./lib/listen');
var Watson = require('./lib/watson');
var Mic = require('./lib/mic');
var Confi = require('./lib/confidence');
var Say = require('./lib/say');
var Chatroom = require('./lib/chatroom');
var Commander = require('./lib/commander');

var Chat = module.exports = function(info, IoT, Http, Room) {
	this.listen = new Listen();
	this.confidence = new Confi(info.witai_passwd);
	this.watson = new Watson(info.watson_username, info.watson_passwd);
	this.mic = new Mic();
	this.say = new Say(info.voicerss_passwd);
	this.chatroom = new Chatroom(Room);
	this.commander = new Commander(IoT);
	this.http = Http;
};

Chat.prototype.start = function() {
	var self = this;

	self.mic.init();
	self.commander.init();

	self.listen.pcm2wav.pipe(self.watson.stt);
	self.mic.micInputStream.pipe(self.listen.pcm2wav);

	self.watson.stt.on('results', function(data) {
		self.confidence.Witai(data, function(err, say){
			if(say.sentence){
				self.commander.MQTT(say.motion);
				self.commander.HTTP(self.http, say.motion);
				self.chatroom.openlab(say.sentence);
				self.say.voicerss(say.sentence);
			}
		});
	});
};
