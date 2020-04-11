const iex = require('iexcloud_api_wrapper')

function quote(symbol) {
    return iex.quote(symbol)
}

module.exports = { quote }
