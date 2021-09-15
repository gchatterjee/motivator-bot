const iex = require('iexcloud_api_wrapper')

const quote = symbol => iex.quote(symbol)

module.exports = { quote }
