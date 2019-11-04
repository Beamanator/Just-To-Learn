/**
 * Name: Variable Name
 * Date: 4 November 2019
 * Difficulty: 2000
 * Chars: 38
 */
// 54 chars
// variableName = n => /^[\da-zA-Z_]+$/.test(n) && isNaN(+n[0])

// 45 chars
// variableName = n => /^\w+$/.test(n) && isNaN(+n[0])

// 40 chars
// variableName = n => /^[_a-zA-Z]\w*$/.test(n)

// 38 chars
// prettier-ignore
variableName = n => /^[a-z_]\w*$/i.test(n)
