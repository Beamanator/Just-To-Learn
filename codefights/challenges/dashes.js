/**
 * Name: Dashes
 * Reverse challenge
 * 16 May 2018
 */
// add dashes to form '-', '-|-', '-|-|-' formation
addash = n =>
    '-|'.repeat(n-1) + '-'

// add padding on either side of string
pad = (s, l) =>
    (P=' '.repeat((l - s.length) / 2)) + s + P

// main function to put it all together
dashes = n =>
    // create new array with length n - 1st 1/2 of solution
    (N=[...Array(n)]
    .map((_, i) =>
        pad(addash(i + 1), n * 2 - 1)
    ))
    // add other half, reversed, minus first element (duplicate)
    .concat([...N].reverse().slice(1, N.length))