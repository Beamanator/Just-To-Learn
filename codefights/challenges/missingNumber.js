/**
 * Name: Missing Numbers
 * Type: Normal Challenge
 * Date: 26 Mar 2020
 * Difficulty: 2000
 * Chars: 96
 * 
 * @param {array} A - array of numbers, missing one
 * @returns first missing number (starting with 0)
 */
missingNumber = A =>
    A.reduce(
        (a, e) => a.substr(0, e) + 1 + a.substr(e + 1),
        ' '.repeat(A.length + 1)
    )
    .indexOf` `
    
// 98
// missingNumber = A =>
//     A.reduce(
//         (a, E) => a.replace(/./g, (e, i) => E == i ? 1 : e),
//         ' '.repeat(A.length + 1)
//     )
//     .indexOf` `

// 98 chars
// missingNumber = A => A.reduce((a, e) => {
//         a[e] = 1
//         return a
//     }, [])
//     .concat(null)
//     .findIndex(e => typeof e !== 'number')

// 100 chars
// missingNumber = A => A.reduce((a, e) => {
//         a[e] = 1
//         return a
//     }, Array(A).fill())
//     .concat(null)
//     .findIndex(e => e == null)