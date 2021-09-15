const { channelIds } = require('../bot.constant')
const { quote } = require('../lib/iex')
const { log } = require('../lib/log')
const { bold, italicize, blockCode } = require('../lib/markdown')

const parseContent = content => content.match(/\$[A-Za-z]{2}[A-Za-z]*/g)

const createMessage = ({
    symbol,
    companyName,
    open,
    close,
    high,
    low,
    latestPrice,
    latestTime,
    week52High,
    week52Low,
}) => {
    const title = `${bold(`${companyName} ($${symbol})`)}\n`
    const latest = `${italicize(
        'Latest:'
    )}\n• $${latestPrice} (${latestTime})\n`
    const latestDay = `${italicize(
        'Latest Day:'
    )}\n• $${open} (open)\n• $${close} (close)\n• $${high} (high)\n• $${low} (low)\n`
    const week52 = `${italicize(
        '52 Week Extrema:'
    )}\n• $${week52High} (high)\n• $${week52Low} (low)`
    return title + latest + latestDay + week52
}

const iexService = (content, _, channel) => {
    const tickers = channel.id === channelIds.money ? parseContent(content) : []
    return Promise.all(
        tickers.map(async match => {
            const ticker = match.slice(1)
            try {
                const data = await quote(ticker)
                log(`got price for $${ticker}`)
                const message = createMessage(data)
                channel.send(message)
            } catch (error) {
                log(
                    `failed to get price for $${ticker}\n${blockCode(
                        `${error}`
                    )}`
                )
            }
        })
    )
}

module.exports = { iexService }
