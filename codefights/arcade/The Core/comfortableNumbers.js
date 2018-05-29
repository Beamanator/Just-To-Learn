/**
 * Name: Comfortable Numbers
 * Core Arcade #: 47
 * 
 * Let's say that number a feels comfortable with number b if a ≠ b and b
 * lies in the segment [a - s(a), a + s(a)], where s(x) is the sum of x's
 * digits.
 * 
 * How many pairs (a, b) are there, such that a < b, both a and b lie on
 * the segment [l, r], and each number feels comfortable with the other?
 * 
 * Example
 * 
 * For l = 10 and r = 12, the output should be
 * comfortableNumbers(l, r) = 2.
 * 
 * Here are all values of s(x) to consider:
 * 
 * s(10) = 1, so 10 is comfortable with 9 and 11;
 * s(11) = 2, so 11 is comfortable with 9, 10, 12 and 13;
 * s(12) = 3, so 12 is comfortable with 9, 10, 11, 13, 14 and 15.
 * Thus, there are 2 pairs of numbers comfortable with each other within
 * the segment [10; 12]: (10, 11) and (11, 12).
 */
// return sum of digits in an integer
getDigitSum = n =>
('' + n).split``.reduce((a, e) =>
    a + (+e), 0);

comfortableNumbers = (l, r) => {
// l has to be less than r to be considered
if (l >= r) return 0;

let tot = 0;

// get all s(x) values needed
for (; l <= r; l++) {
    // get sum & line segment from lower number
    let lowDigitSum = getDigitSum(l);
    let lowSeg = [l - lowDigitSum, l + lowDigitSum];
    
    // get max number to search s(x) for
    let upperLimit = lowSeg[1] < r ? lowSeg[1] : r;
    
    // get all s(x) values & segment for values in range
    for (let n = l + 1; n <= upperLimit; n++) {
        // get sum & line segment from upper values
        let upDigitSum = getDigitSum(n);
        let upSeg = [n - upDigitSum, n + upDigitSum];
        
        // if lower value in range of upper segment, the numbers are comfortable :D
        if (l >= upSeg[0] && l <= upSeg[1])
            tot++;
    }
}

// return count of comfortable pairs of numbers
return tot;
}