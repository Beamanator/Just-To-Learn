/**
 * Name: Longest Word
 * Difficulty: 2000
 * Date: 1 Dec 2019
 * Chars: 68
 */

// 68 chars
longestWord = t => t.match(/[a-z]+/gi).sort((a,b) => b.length - a.length)[0]

// 74 chars
longestWord = t =>
    t
        .match(/[a-z]+/gi)
        .reduce(
            (m, w) => w.length > m.length ? w : m,
            ''
        )
