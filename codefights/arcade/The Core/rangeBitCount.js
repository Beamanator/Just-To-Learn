/**
 * Name: Range Bit Count
 * Core Arcade #: 19
 * 
 * You are given two numbers a and b where 0 ≤ a ≤ b. Imagine you
 * construct an array of all the integers from a to b inclusive.
 * You need to count the number of 1s in the binary representations
 * of all the numbers in the array.
 * 
 * Example
 * 
 * For a = 2 and b = 7, the output should be
 * rangeBitCount(a, b) = 11.
 * 
 * Given a = 2 and b = 7 the array is: [2, 3, 4, 5, 6, 7].
 * Converting the numbers to binary, we get
 * [10, 11, 100, 101, 110, 111], which contains
 * 1 + 2 + 1 + 2 + 2 + 3 = 11 1s.
 */
rangeBitCount = (a, b) =>
    // create empty array, with spaces for each value
    [...Array(b - a + 1)]

    // fill empty arrays with nums (inclusive)
    .map((_, i) => i + a)

    // calc # of '1's in binary (a is accumulator)
    .reduce((a, e) =>
        // convert #s to binary
        a + e.toString(2)
        
        // count # of '1' chars
        .split('1').length - 1
    , 0)