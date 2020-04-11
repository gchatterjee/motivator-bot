function bold(text) {
    return '**' + text + '**'
}

function italicize(text) {
    return '*' + text + '*'
}

function inlineCode(text) {
    return '`' + text + '`'
}

function blockCode(text, language='') {
    return '```' + language + '\n' + text + '```'
}

function blockQuote(text) {
    let lines = text.split('\n')
    lines = lines.map(line => '> ' + line)
    let message = ''
    for(let line of lines) {
        message = message + line
    }
    return message
}

function spoiler(text) {
    return '||' + text + '||'
}

module.exports = {
    bold,
    italicize,
    inlineCode,
    blockQuote,
    blockCode,
    spoiler
}
