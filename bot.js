var auth = require('./auth.json');
// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = auth.token

// constants
const botId = '379491763414368261';
const jobsId = '364834807043063819';
const gamesId = '364835892755562496';
const logId = '380542106650804225';

var jobsChannel = null;
var gamesChannel = null;
var logChannel = null;

var despairRegexes = [];

function isBot(user) {
    return (user.id === botId);
}

function loadDespairPhrases() {
    const despairPhrases = require('./despair.json');
    var despairRegexes = []
    for(let phrase of despairPhrases.phrases) {
        despairRegexes.push(new RegExp(phrase));
    }
    return despairRegexes;
}

function getChannels(guild, idList) {
    let channels = [];
    for(id of idList) {
        let chan = guild.channels.get(id);
        if(chan !== undefined && chan !== null) {
            channels.push(chan);
        }
    }
    return channels;
}

function log(message) {
    if (logChannel === null) {
        console.log(message);
    } else {
        logChannel.send(message);
    }
}

// main
client.on('ready', () => {
  log('Successfully connected.');
  despairRegexes = loadDespairPhrases();
});

// Create an event listener for messages
client.on('message', message => {
    // log(message.content);

    if(jobsChannel === null && message.channel.id === jobsId) {
        jobsChannel = message.channel;
    }
    if(gamesChannel === null && message.channel.id === gamesId) {
        gamesChannel = message.channel;
    }
    if(logChannel === null && message.channel.id === logId) {
        logChannel = message.channel;
        log('Log initialization successful. Log will now be displayed in this channel instead of locally on console.');
    }

    if((message.content.toLowerCase() === 'fuck <@' + botId + '>') ||
       (message.content.toLowerCase() === 'fuck you <@' + botId + '>')) {
        log(message.author.username + ': ' + message.content);
        const response = 'Fuck you too, <@' + message.author.id + '>!'
        log('me: ' + response)
        message.channel.send(response);
    }
    else {
        let despairFlag = false;
        for(exp of despairRegexes) {
            if(exp.test(message.content.toLowerCase())) {
                log(message.author.username + ': ' + message.content);
                const response = 'Hi <@' + message.author.id + '>. I sense that you are in despair.'
                log('me: ' + response);
                message.channel.send(response);
                break;
            }
        }
    }
});

client.on('presenceUpdate', update => {
    if (update.user !== null) {
        const response = 'Stop playing ' + update.user.presence.game.name + ', <@' + update.userId + '>! Apply to some <#' + jobsId + '>!';
        log('me: ' + response);
        for (channel of [gamesChannel, jobsChannel]) {
            if (channel !== null) {
                channel.send(response);
            }
        }
    }
})

// Log our bot in
client.login(token);
