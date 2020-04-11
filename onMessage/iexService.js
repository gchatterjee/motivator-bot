const { channelIds } = require('../bot.constant')
const { quote } = require('../lib/iex')
const { log } = require('../lib/log')
const { bold, italicize } = require('../lib/markdown')

function parseContent(content) {
    return content.match(/\$[A-Za-z]{2}[A-Za-z]*/g)
}

function createMessage(stockData) {
    const {
        symbol,
        companyName,
        open,
        close,
        high,
        low,
        latestPrice,
        latestTime,
        week52High,
        week52Low
    } = stockData

    const title =
        bold(companyName + ' ' + '($' + symbol +')') +
        '\n'
    const latest =
        italicize('Latest:') + '\n• $' + latestPrice + ',' + latestTime + '\n'
    const latestDay =
        italicize('Latest Day:') +
        '\n• $' + open + ' (open)' +
        '\n• $' + close + ' (close)' +
        '\n• $' + high + ' (high)' +
        '\n• $' + low + ' (low)\n'
    const week52 =
        italicize('52 Week Extrema:') +
        '\n• $' + week52High + ' (high)' +
        '\n• $' + week52Low + '(low)'
    return title + latest + latestDay + week52
}

function iexService(content, author, channel) {
    let tickers
    if (channel.id === channelIds.money) {
        tickers = parseContent(content)
    }
    if (tickers) {
        tickers.forEach(ticker => {
            ticker = ticker.slice(1)
            quote(ticker)
                .then(data => {
                    log('got price for $' + ticker)
                    const message = createMessage(data)
                    channel.send(message)
                })
                .catch(() => {
                    log('failed to get price for $' + ticker)
                })
        })
    }
}

module.exports = { iexService }
