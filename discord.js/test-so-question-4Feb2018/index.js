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

        case '?RESET':
            resetBot(message.channel);
            break;
    }
});

// OP wanted the bot to turn off, then turn back on again
function resetBot(channel) {
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(auth.bot_token));
}

client.login(auth.bot_token);