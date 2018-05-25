/**
 * Name: Is Sum of Consecutive 2
 * Core Arcade #: 44
 * 
 * Find the number of ways to express n as sum of some (at least two)
 * consecutivepositive integers.
 * 
 * Example
 * 
 * For n = 9, the output should be
 * isSumOfConsecutive2(n) = 2.
 * 
 * There are two ways to represent n = 9: 2 + 3 + 4 = 9 and 4 + 5 =
 * 9.
 * 
 * For n = 8, the output should be
 * isSumOfConsecutive2(n) = 0.
 * 
 * There are no ways to represent n = 8.
 */
function isSumOfConsecutive2(n) {
    let tot = 0, start = 1, end = ~~(n/2) + 1;
    
    while (start < end) {
        let sum = 0;
        for (let i = start; i <= end; i++) {
            sum += i;
            if (sum >= n)
                break;
        }
        if (sum == n) {
            tot++
        }
        start++;
    }
    
    return tot;
}
