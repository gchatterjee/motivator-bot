const auth = require('./auth.json')
const Discord = require('discord.js')
const { /* channelIds, */userIds } = require('./bot.constant')
const { log } = require('./lib/log')

const client = new Discord.Client()
const token = auth.token

client.on('ready', () => {
    log('Successfully connected.')
})

client.on('message', message => {

    const { /*content,*/ author, channel } = message
    const { guild } = channel

    if (author.id === userIds.bot) {
        return
    }

    log('Logging initialization successful. Logging will be recorded in both local console and logging channel.', guild)
})

client.on('presenceUpdate', update => {
    console.log(update)
})

// Log our bot in
client.login(token)
