const { channelIds } = require('../bot.constant')
const { getChannelById } = require('./channel')

const log = (message, guild) => {
    // eslint-disable-next-line no-console
    console.log(message)
    const logChannel = getChannelById(channelIds.log, guild)
    if (logChannel) logChannel.send(message.replace('@', '~@~'))
}

module.exports = { log }
