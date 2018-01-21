// https://stackoverflow.com/questions/48362758/delete-all-messages-in-a-channel-from-my-bot/48364772#48364772
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth');

client.on('ready', () => {
    console.log('I am ready!');
});

// set message listener 
client.on('message', message => {
    switch(message.content.toUpperCase()) {
        case '?PING':
            message.reply('pong');
            break;

        case '?CLEAR':
            clearBotMessages(message.channel);
            break;
    }
});

// OP's issue was that he / she didn't use () on .array() - however,
// he / she probably sould have used Array.from(messages.values())
function clearBotMessages(channel) {
    // channel.fetchMessages()
    // .then(messages => {
    //     let msgArray = Array.from(messages.values());
    //     console.log(msgArray.length);
    // });

    channel.fetchMessages()
    .then(messages => messages.array().forEach(
        message => message.author.equals(client.user) && message.delete()
    ));
}

client.login(auth.bot_token);