/**
 * Name: Is Power?
 * Core Arcade #: 43
 * 
 * Determine if the given number is a power of some non-negative
 * integer.
 * 
 * Example
 * 
 * For n = 125, the output should be
 * isPower(n) = true;
 * For n = 72, the output should be
 * isPower(n) = false.
 * Input/Output
 * 
 * [execution time limit] 4 seconds (js)
 * 
 * [input] integer n
 * 
 * A positive integer.
 * 
 * Guaranteed constraints:
 * 1 ≤ n ≤ 400.
 * 
 * [output] boolean
 * 
 * true if n can be represented in the form ab (a to the power of b)
 * where a and b are some non-negative integers and b ≥ 2, false
 * otherwise.
 */
function isPower(n) {
    if (n == 1) return true;
    for (let i = 2; i <= ~~Math.sqrt(n); i++) {
        if (n % i == 0) {
            let N = n;
            while (N % i == 0 && N > i) {
                N /= i;
            }
            if (n % i == 0 && N == i)
                return true;
        }
    }
    return false;
}
