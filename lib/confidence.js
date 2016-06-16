"use strict";
var async = require("async");
var WitAI = require('./witai');

var Confi = module.exports = function(witai_passwd) {
	this.dishes = 0;
	this.witai = new WitAI(witai_passwd);
};

Confi.prototype.Witai = function(words, finish) {
	var self = this;
	var sushi = {
		name: null,
		counter: 0,
		text: null,
		flag: 0
	}
	self.witai.init();

	function messageProcess(data, callback) {
		if(data.entities.sushi&&data.entities.number){ // flag = 9
			sushi['flag'] = 9;
			sushi['name'] = data.entities.sushi[0].value;
			sushi['counter'] = parseInt(data.entities.number[0].value);
			sushi['text'] = data._text;
			callback(null, 'done');
		}
		else if(data.entities.check){ // flag = 5
			if(sushi['flag'] < 5){
				sushi['flag'] = 5;
				sushi['text'] = data._text;
			}
			callback(null, 'done');
		}
		else if(data.entities.hello){ // flag = 4
			if(sushi['flag'] < 4){
				sushi['flag'] = 4;
				sushi['text'] = data._text;
			}
			callback(null, 'done');
		}
		else{
			callback(null, 'done');
		}
	};

	function actionsProcess(callback) {
		if(sushi['flag'] == 9){
			self.dishes = parseInt(self.dishes) + parseInt(sushi['counter']);
			self.witai.runActions(sushi['text'], function(err, data, say){
				if(data){
					if(typeof(callback)=='function'){
						return callback(null, 2, say);
					};
				}
				else{
					if(typeof(callback)=='function'){
						return callback(null, 0, '');
					};
				}
			});
		}
		else if(sushi['flag'] == 5){
			self.witai.dishes =	self.dishes;
			self.witai.runActions(sushi['text'], function(err, data, say){
				if(data){
					if(typeof(callback)=='function'){
						return callback(null, 3, say);
					};
				}
				else{
					if(typeof(callback)=='function'){
						return callback(null, 0, '');
					};
				}
			});
		}
		else if(sushi['flag'] == 4){
			self.witai.runActions(sushi['text'], function(err, data, say){
				if(data){
					if(typeof(callback)=='function'){
						return callback(null, 1, say);
					};
				}
				else{
					if(typeof(callback)=='function'){
						return callback(null, 0, '');
					};
				}
			});
		}
		else{
			return callback(null, 0, '');
		}
	};

	words.results.forEach(function(result) {
		if(result.final){
			async.each(result.alternatives, function(item, nextItem) {
				self.witai.message(item.transcript, function(err, data){
					if(data){
						messageProcess(data, function(err, done){
							nextItem();
						});
					}
					else{
						nextItem();
					}
				});
			}, function(err) {
				actionsProcess(function(err, motion, sentence){
					var say = {
						sentence: sentence,
						motion: motion
					}
					if(typeof(finish)=='function'){
					  return finish(null, say);
					}
				});
			});
		}
	});
};
