const bold = text => `**${text}**`
const italicize = text => `*${text}*`
const inlineCode = text => `\`${text}\``
const blockCode = (text, language = '') => `\`\`\`${language}\n${text}\`\`\``
const blockQuote = text =>
    text
        .split('\n')
        .map(line => `> ${line}`)
        .join('')

module.exports = { bold, italicize, inlineCode, blockCode, blockQuote }
