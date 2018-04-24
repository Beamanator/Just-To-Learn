/**
 * Name: Swap Adjacent Bits
 * Core Arcade #: 22
 * 
 * You're given an arbitrary 32-bit integer n. Take its binary
 * representation, split bits into it in pairs (bit number 0 and 1,
 * bit number 2 and 3, etc.) and swap bits in each pair. Then return
 * the result as a decimal number.
 * 
 * Example
 * 
 * For n = 13, the output should be
 * swapAdjacentBits(n) = 14.
 * 
 * 1310 = 11012 ~> {11}{01}2 ~> 11102 = 1410.
 * 
 * For n = 74, the output should be
 * swapAdjacentBits(n) = 133.
 * 
 * 7410 = 010010102 ~> {01}{00}{10}{10}2 ~> 100001012 = 13310.
 * Note the preceding zero written in front of the initial number:
 * since both numbers are 32-bit integers, they have 32 bits in their
 * binary representation. The preceding zeros in other cases don't
 * matter, so they are omitted. Here, however, it does make a difference.
 * 
 * @param {any} n 
 * @returns 
 */
function swapAdjacentBits(n) {
    // parse binary number into decimal number
    return parseInt(
        // add prefix '0' if necessary
        ((n.toString(2).length % 2 == 1 ? '0' : '') +
        
        // split number into array of binary digits
        n.toString(2)).split('')

        // swap every other bit
        .reduce((a, e, i, arr) => {
            // 0 -> 1, 2 -> 3, etc
            if (i % 2 == 0)
                a[i+1] = e;
            
            // 1 -> 0, 3 -> 2, etc
            else
                a[i-1] = e;

            // return updated array
            return a;
        }, [])

        // join swapped bits into string
        .join('')
    , 2);
}