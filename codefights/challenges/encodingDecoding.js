/**
 * Name: Encoding Decoding
 * Date: 23 Oct 2018
 * Difficulty: 2000
 * Note: Reverse Challenge
 */
// 178 chars
i = 0
encodingDecoding = m =>
    // if first character is a number, convert backwards!
    /[0-9]/.test(m[0])
    ? m.replace(
        /([a-z0-9]){2}/g,
        a => String.fromCharCode(parseInt(a, 16) + i--)
    )
    // else convert forwards!
    : m.replace(
        /([a-z0-9A-Z ])/g,
        a => (a.charCodeAt(0) + i++).toString(16)
    )