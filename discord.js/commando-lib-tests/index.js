// Docs: https://discord.js.org/#/docs/commando/master/general/first-steps
const commando = require('discord.js-commando');

const path = require('path'); // for setProvider stuff
// const sqlite = require('sqlite'); // for setProvider stuff
const token = require('./auth').bot_token;

const client = new commando.Client({
	owner: '151065925792169985',
	commandPrefix: 'cdev'
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(
            `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
        );
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
        let log =
            `Command ${msg.command ? msg.command.groupID + ':' + msg.command.memberName : ''}` +
            `blocked; ${reason}`;
        
        console.log(msg);
			
	})
	.on('commandPrefixChange', (guild, prefix) => {
		let msg =
			`Prefix ${prefix === '' ? 'removed' : 'changed to ' + (prefix || 'the default')}` +
			`${guild ? 'in guild ' + guild.name + ' (' + guild.id + ')' : 'globally'}.`;
        
        console.log(msg);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		let msg = 
			`Command ${command.groupID}:${command.memberName}` +
			`${enabled ? 'enabled' : 'disabled'}` +
			`${guild ? 'in guild ' + guild.name + ' (' + guild.id + ')' : 'globally'}.`;
        
        console.log(msg);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		let msg =
			`Group ${group.id}` + 
			`${enabled ? 'enabled' : 'disabled'}` +
			`${guild ? 'in guild ' + guild.name + ' (' + guild.id + ')' : 'globally'}.`;
        
        console.log(msg);
	});

// client.setProvider(
// 	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
// ).catch(console.error);

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['math', 'Math'],
        ['test-so', 'Test - Stack Overflow Cmds']
    ])
    
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your custom types in the ./types/ directory
    .registerTypesIn(path.join(__dirname, 'types'))
    
    // Registers all of your commands in the ./commands/ directory
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);


