const commando = require('discord.js-commando');

module.exports = class DankCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dank',
			group: 'test-so', // registered in index.js
			memberName: 'dank',
			description: 'Checks whether the argument provided is dank.',

			args: [
				{
					key: 'dank',
					label: 'dank',
					prompt: 'Say dank.',
					type: 'dank'
				}
			]
		});
	}

	run(msg, { dank }) {
		return msg.reply(dank);
	}
};