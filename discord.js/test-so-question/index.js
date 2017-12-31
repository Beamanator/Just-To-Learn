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

        case '?TYPE':
            runWordGame(message.channel);
            break;
    }
});

// function runs word game
function runWordGame(channel) {
    // create random string
    let randomWord = Math.random().toString(36).replace(/[^a-z]+/g, '');

    channel.send("Generating a new word..")
    .then(msg => {
        // display countdown with promise function :)
        return displayMessageCountdown(channel);
    })
    .then(countdownMessage => {
        // chain promise - sending message to channel
        return countdownMessage.edit(randomWord);
    })
    .then(randomMsg => {
        // setup collector
        channel.awaitMessages(function(userMsg) {
            // check that user created msg matches randomly generated word :)
            if (userMsg.id !== randomMsg.id && userMsg.content === randomWord)
                return true;
        }, {
            max: 1,
            time: 10000,
            errors: ['time'],
        })
        .then(function(collected) {
            // here, a message passed the filter!
            let successMsg = 'Success!\n';

            // turn collected obj into array
            let collectedArr = Array.from(collected.values());

            // insert time it took user to respond
            for (let msg of collectedArr) {
                let timeDiff = (msg.createdTimestamp - randomMsg.createdTimestamp) / 1000;
                
                successMsg += `Your time was ${timeDiff} seconds.\n`;
            }

            // send success message to channel
            channel.send(successMsg);
        })
        .catch(function(collected) {
            // here, no messages passed the filter
            channel.send(
                `There were no messages that passed the filter within the time limit!`
            );
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Function displays countdown message, then passes Message obj back to caller
function displayMessageCountdown(channel) {
    let timer = 3;

    return new Promise( (resolve, reject) => {
        channel.send("Starting in..")
        .then(function(msg) {
            var interval = setInterval(function () {
                msg.edit(`Starting in **${timer--}**..`);
    
                // clear timer when it gets to 0
                if (timer === 0) {
                    clearInterval(interval);
                    resolve(msg);
                }
            }, 1000);
        })
        .catch(reject);
    }); 
}

client.login(auth.bot_token);