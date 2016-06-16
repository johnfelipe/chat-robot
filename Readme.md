Chat Robot
=================

Simple chatting example by Wesley Tsai.

Features
-

* Use mic and wav to record the audio.
* Use IBM watson for speech-to-text.
* Use WitAI for dialog and AI.
* Use voicerss for text-to-speech.
* Support the MQTT to control the robot(thing).
* Support the REST API to control the robot.
* Support the chatroom to show the reply from robot.

Installation
-

Install directly via NPM

```sh
$ npm install chat-robot
```

Getting started
-

### Write the main application (app.js)
***
```sh
"use strict";
var chatting = require('chat-robot');

var info = {
  watson_username: '6a301e8-1906-4386-acfd-4d4d4a32a89',
  watson_passwd: 'AaIdatTWfL3',
  witai_passwd: 'ERSPTQZEDYGQBQ6VRGKJIHZGGIT6MT',
  voicerss_passwd: '1e6ec70180a487a9ad64c397f0d58d'
}

var IoT ={
  domain: 'yq0gk',
  name: '7688duo',
  id: '7688-sender-1',
  passwd: 'xvzJOBDhlJL4*p1H'
}

var Http ={
  host: 'http://192.168.43.115',
  port: '8080',
  uri: 'value'
}

var ChatRoom ={
  host: 'http://192.168.10.115',
  port: '9012',
  uri: 'chat'
}

var Chat = new chatting(info, IoT, Http, ChatRoom);

Chat.start();
```

Please fill in your watson username/passed, witai token, and voicerss token.

If you want to control your robot(thing) via IBM IoT, please fill in your into IoT value.

If you want to support REST API to control your robot, please fill in the Http value.

If you had se tup your chat room service, the Chatroom module will use POST method to push robot's reply to your chat room service.

### Run the main application (app.js)

```sh
$ node app.js
```


License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2016 Wesley Tsai<<wesleyboy42@gmail.com>>
