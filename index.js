const fs = require('node:fs');
const path = require('node:path');

const { discordToken, discordID, discordChannel } = require('./settings');


/* Create Discord Client */
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();
client.buttons = new Collection();

const funcDir = path.join(__dirname, 'functions')
const functions = fs.readdirSync(funcDir).filter(file => file.endsWith('.js'));
for (const file of functions) {
	require(path.join(funcDir, file))(client);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async interaction => {
    if(interaction.author.bot) return;
    if(interaction.channelId != discordChannel) return;

    interaction.react('✍️')
})

client.commandHandler()
client.componentHandler()
client.login(discordToken);