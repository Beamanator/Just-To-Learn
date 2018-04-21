/**
 * Name: Array Packing
 * Core Arcade #: 18
 * 
 * You are given an array of up to four non-negative integers,
 * each less than 256.
 * 
 * Your task is to pack these integers into one number M in the
 * following way:
 * 
 * The first element of the array occupies the first 8 bits of M;
 * The second element occupies next 8 bits, and so on.
 * Return the obtained integer M.
 * 
 * Note: the phrase "first bits of M" refers to the least
 * significant bits of M - the right-most bits of an integer.
 * For further clarification see the following example.
 * 
 * Example
 * 
 * For a = [24, 85, 0], the output should be
 * arrayPacking(a) = 21784.
 * 
 * An array [24, 85, 0] looks like [00011000, 01010101, 00000000]
 * in binary.
 * After packing these into one number we get 00000000 01010101
 * 00011000 (spaces are placed for convenience), which equals
 * to 21784.
 */
// short version:
p = s => '0'.repeat(8 - s.length) + s;
arrayPacking = a =>
    parseInt( // turn the string into a number (base 10)
        a.reverse() // reverse the array
            // turn array into an accumulated string of binary
            .reduce((a, n) => {
                return a + p(n.toString(2));
            }, ''), // initial value is empty string
        2
    )

// pad binary # with leading 0's (up to 8 total)
// pad = s => '0'.repeat(8 - s.length) + s;
// function arrayPacking(a) {
//     return parseInt( // turn the string into a number (base 10)
//         a.reverse() // reverse the array
//             // turn array into an accumulated string of binary
//             .reduce((accumulator, next) => {
//                 return accumulator + pad(next.toString(2));
//             }, ''), // initial value is empty string
//         2
//     );
// }
