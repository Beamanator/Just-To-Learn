const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth');

// get admin commands - for SO question
const adminCmds = require('./adminCmds');

// get controller for spam messages
let spamCtrl = require('./spamCtrl');

client.on('ready', () => {
    console.log('I am ready!');
});

// set message listener 
client.on('message', message => {
    let command = message.content.toUpperCase();

    let cmdName = command.split(' ')[0],
        cmdArgs = command.substr( command.indexOf(' ') );
    
    // first \w+ is for the title, 2nd is for description
    // -> command is '/embed [title]; [description]
    if ( /^\/EMBED \[[\w ]+\]; \[[\w ]+\]$/.test(command) )
        sendEmbed(message);

    // execute admin commands
    else if ( adminCmds.checkAdminCmd(message) )
        return;

    // execute other commands
    else {
        switch(cmdName) {
            case '?PING':
                message.reply('pong');
                break;

            case '?TYPE':
                runWordGame(message.channel);
                break;

            // 2 commands together make spamming work :)
            case '?SPAM':
                spamCtrl.setChannel(message.channel);
                spamCtrl.setStatus(true);
                break;
            case '?STOP-SPAM':
                spamCtrl.setStatus(false);
                break;

            case '?T1':
                runIfRoleIncluded(message);
                break;

            case '?T2':
                DMme(message.channel);
                break;

            case '?T3':
                logMentionChannels(message);
                break;

            case '?T4':
                playSoundOnJoinVoiceChannel(message);
                break;

            case '?T5':
                send2Embeds(message);
                break;
        }
    }
});

// https://stackoverflow.com/questions/48614541/sending-multiple-embeds-at-once/48619657#48619657
function send2Embeds(message) {
    let channel = message.channel;

    // next create rich embeds
    let embed1 = new Discord.RichEmbed({
        title: 'embed1',
        description: 'description1',
        author: {
            name: 'author1'
        }
    });

    let embed2 = new Discord.RichEmbed({
        title: 'embed2',
        description: 'description2',
        author: {
            name: 'author2'
        }
    });

    // send embed to channel
    channel.send(embed1)
    .then(msg => {
        channel.send(embed2);
    });
}

// not working :(
function playSoundOnJoinVoiceChannel(message) {
    let channels = client.channels;
    
    let myVoiceChannel = channels.find('id', '396946462782521361');
    let connection = myVoiceChannel.connection;

    // console.log(myVoiceChannel);
    // console.log('\n\n\n');
    // console.log(connection);
    // console.log(myVoiceChannel.members);

    myVoiceChannel.join()
    .then(connection => {
        console.log(connection);
    })
    .catch(err => console.log(err));

}

// oops, didn't write down the SO url
function logMentionChannels(message) {
    let channels = message.mentions.channels;

    console.log(channels);

    let myChannels = channels.map(channel => new Object({
        'id': channel.id,
        'name': channel.name
    }));

    console.log(myChannels);
}

// https://stackoverflow.com/questions/48561487/sending-a-dm-through-a-command-to-a-specific-person-from-a-database-discord-js/48562007?noredirect=1#comment84165634_48562007
// -> send direct message
function DMme(channel) {
    // method 1 - send message to member inside channel
    // let members = channel.members;
    // let guildMember = members.find('id', '<id number>');

    // guildMember.send('test message');

    // method 2 - send message to user!
    let client = channel.client;
    let user = client.fetchUser('<id number>')
    .then(user => {
        user.send('Test message'); 
    });
}

// https://stackoverflow.com/questions/47371294/having-a-bot-send-an-embed-using-a-player-command
function sendEmbed(message) {
    let command = message.content;
    let channel = message.channel;
    let author = message.author;

    // get title string coordinates in command
    let titleStart = command.indexOf('[');
    let titleEnd = command.indexOf(']');
    let title = command.substr(titleStart + 1, titleEnd - titleStart - 1);

    // get description string coordinates in command
    // -> (start after +1 so we don't count '[' or ']' twice)
    let descStart = command.indexOf('[', titleStart + 1);
    let descEnd = command.indexOf(']', titleEnd + 1);
    let description = command.substr(descStart + 1, descEnd - descStart - 1);

    // next create rich embed
    let embed = new Discord.RichEmbed({
        title: title,
        description: description
    });

    // set author based of passed-in message
    embed.setAuthor(author.username, author.displayAvatarURL);

    // send embed to channel
    channel.send(embed);
}

// https://stackoverflow.com/questions/48352002/how-to-create-a-command-that-only-who-have-one-of-the-roles-can-use
function runIfRoleIncluded(message) {
    let rolesCollection = message.member.roles;
    let staffrole = ['383874699941117952', '149622819158884353', '149622998180036608'];

    // only 1 member can send a message, so get role collection's first key (id)
    let messageRoleId = rolesCollection.firstKey();

    // check if message's role id is in staff role array
    if (staffrole.includes(messageRoleId)) {
        // do stuff here
        // ...
    }
}

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