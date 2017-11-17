var auth = require('./auth.json');
// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = auth.token

// constants
const jeansId = '157610741858304000';
const botId = '379491763414368261';

// helper functions
function isJeans(user) {
    return (user.id === jeansId);
}

// main
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    console.log(message.content);
    if ((message.content.toLowerCase() === 'fuck <@' + botId + '>') ||
        (message.content.toLowerCase() === 'fuck you <@' + botId + '>')) {
    message.channel.send('Fuck you too!');
    }
    if (isJeans(message.author)) {
    }
});

// Log our bot in
client.login(token);
