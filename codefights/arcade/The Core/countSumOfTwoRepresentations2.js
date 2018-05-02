/**
 * Name: Count Sum of Two Representations 2
 * Core Arcade #: 26
 * 
 * Given integers n, l and r, find the number of ways to represent
 * n as a sum of two integers A and B such that l ≤ A ≤ B ≤ r.
 * 
 * Example
 * 
 * For n = 6, l = 2 and r = 4, the output should be
 * countSumOfTwoRepresentations2(n, l, r) = 2.
 * 
 * There are just two ways to write 6 as A + B,
 * where 2 ≤ A ≤ B ≤ 4: 6 = 2 + 4 and 6 = 3 + 3.
 */
// smaller version
countSumOfTwoRepresentations2 = (n, l, r) =>
    n >= 2*l && n <= 2*r ?
        Math.min(~~(n/2) - l, r - Math.ceil(n/2)) + 1 :
        0

// long version
function countSumOfTwoRepresentations2(n, l, r) {
    if (n >= 2*l && n <= 2*r) {
        return Math.min(
            Math.floor(n/2) - l,
            r - Math.ceil(n/2)
        ) + 1
    } else {
        return 0;
    }
}
