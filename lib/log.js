const { channelIds } = require('../bot.constant')
const { getChannelById } = require('./channel')

function log(message, guild) {
    console.log(message)
    const logChannel = getChannelById(channelIds.log, guild)
    if (logChannel) {
        logChannel.send(message.replace('@', '~@~'))
    }
}

module.exports = { log }
