const Discord = require('discord.js')
const auth = require('./auth.json')
const { userIds } = require('./bot.constant')
const { log } = require('./lib/log')
const { iexService } = require('./onMessage/iexService')

const client = new Discord.Client()
const { token } = auth

let loggingSuccessful = false

client.on('ready', () => {
    log('Successfully connected.')
})

client.on('message', ({ content, author, channel }) => {
    const { guild } = channel

    if (author.id !== userIds.bot) {
        if (!loggingSuccessful) {
            log(
                'Logging initialization successful. Logging will be recorded in both local console and logging channel.',
                guild
            )
            loggingSuccessful = true
        }

        const services = [iexService]

        services.forEach(service => service(content, author, channel))
    }
})

// client.on('presenceUpdate', update => {
//     console.log(update)
// })

// Log our bot in
client.login(token)
