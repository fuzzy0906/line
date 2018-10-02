var linebot = require('linebot');
var express = require('express');
var path = require('path');

var bot = linebot({
    channelId: '1611515190',
    channelSecret: '388145671672df91c832a337d5aac4d9',
    channelAccessToken: 'eHizQwEUizvGlzAAZSPAitvKi7u2hEKqeuJgttfhDvzC1WbLNYBs7odH4RXt7Pzx6FS42ayJU1DSKGfs74JAofDSbXZL9/QC2v7S9tyLs31ZWSv942cIuQZi6QGPl8axWehXfgnyJydKK73/VpnvHwdB04t89/1O/w1cDnyilFU='
});

var message = {
    "你好":"我不好",
    "你是誰":"我是ㄐ器人",
    "你幾歲":"我10歲"
};

bot.on('message', function (event) {
    var respone;
    if(message[event.message.text]){
        respone = message[event.message.text];
    }else{
        respone = '我不懂你說的 ['+event.message.text+']';
    }
	console.log(event.message.text + ' -> ' + respone);
    bot.reply(event.replyToken, respone);
});

bot.on('beacon', function (event) {
    console.log('beacon: ' + event.beacon.type);
    var respone;
    switch(event.beacon.type){
        case 'enter':
               respone = '你進入教室';
              break;
        case 'leave':
             respone = '你離開教室';
             break;
        default:
             respone = '我壞掉了';
     }
     bot.reply(event.replyToken, respone);
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
app.get('/', function(req, res) {
    res.send('Welcome to LineBot');
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;	
	bot.push('U1372640af7b78a14c4aa235890c86f1e','Server is ready');
	bot.push('U6bb0958b3ed12c5e75b310f4192a3ed8','Server is ready');
    console.log("App now running on port", port);
});
