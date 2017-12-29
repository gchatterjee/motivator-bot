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

const trackedChannelIds = [jobsId, gamesId, logId];

const addDespairTrigger = 'motivator-bot -d ';

var channels = [];
var despairRegexes = [];
var loggingSetup = false;

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
        let channel = guild.channels.get(id);
        if(channel !== undefined && channel !== null) {
            channels.push({'id':id, 'channel':channel});
        }
    }
    return channels;
}

function getChannel(id) {
    for(channel of channels) {
        if(channel.id === id) {
            return channel.channel;
        }
    }
    return null;
}

function log(message) {
    console.log(message);
    const logChannel = getChannel(logId);
    if (logChannel !== null) {
        logChannel.send(message.replace('@', ''));
    }
}

// main
client.on('ready', () => {
  log('Successfully connected.');
  despairRegexes = loadDespairPhrases();
});

// Create an event listener for messages
client.on('message', message => {

    var logMessage = (getChannel(logId) === null);
    channels = getChannels(message.guild, trackedChannelIds);
    if(logMessage && getChannel(logId) !== null) {
        log('Logging initialization successful. Logging will be recorded in both local console and logging channel.')
    }

    if(message.author.id === botId) { return; }

    if((message.content.toLowerCase() === 'fuck <@' + botId + '>') ||
       (message.content.toLowerCase() === 'fuck you <@' + botId + '>')) {
        log(message.author.username + ': ' + message.content);
        const response = 'Fuck you too, <@' + message.author.id + '>!'
        log('me: ' + response)
        message.channel.send(response);
    }
    else {
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

    //TODO: Add routine to add despair triggers
    // if(message.content.startsWith(addDespairTrigger)) {
    //     if(message.content !== addDespairTrigger) {
    //         phrase = message.content.slice(addDespairTrigger.length, message.content.length);
    //
    //     }
    // }

    //TODO: Add routine for collecting user data.

});

client.on('presenceUpdate', update => {
    if (update.user !== null) {
        if(update.user.presence.game !== null) {
            const response = 'Stop playing ' + update.user.presence.game.name + ', <@' + update.user.id + '>! Apply to some <#' + jobsId + '>!';
            log('me: ' + response);
            for (channel of [getChannel(gamesId), getChannel(jobsId)]) {
                if (channel !== null) {
                    channel.send(response);
                }
            }
        }
    }
})

// Log our bot in
client.login(token);
