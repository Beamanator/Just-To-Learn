// https://stackoverflow.com/questions/49712202/discord-bot-how-to-make-new-class-and-new-commands-in-javascript
const commando = require('discord.js-commando');

module.exports = class PurgeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'test-so', // registered in index.js
            memberName: 'purge',
            description: 'Purge some messages from a Text Channel.',
            examples: ['purge 5'],

            args: [
                {
                    key: 'numToPurge',
                    label: 'number',
                    prompt: 'Please input a number ( > 0) of messages to be deleted.',
                    type: 'integer'
                }
            ]
        });
    }

    run(msg, { numToPurge }) {
        let channel = msg.channel;

        // fail if number of messages to purge is invalid
        if (numToPurge <= 0) {
            return msg.reply('Purge number must be greater than 0');
        }

        // channel type must be text for .bulkDelete to be available
        else if (channel.type === 'text') {
            return channel.fetchMessages({limit: numToPurge})
                .then(msgs => channel.bulkDelete(msgs))
                .then(msgs => msg.reply(`Purge deleted ${msgs.size} message(s)`))
                .catch(console.error);
        }
        else {
            return msg.reply('Purge command only available in Text Channels');
        }
    }
};