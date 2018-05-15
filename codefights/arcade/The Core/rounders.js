/**
 * Name: Rounders
 * Core Arcade #: 32
 * 
 * We want to turn the given integer into a number that has only
 * one non-zero digit using a tail rounding approach. This means
 * that at each step we take the last non 0 digit of the number
 * and round it to 0 or to 10. If it's less than 5 we round it
 * to 0 if it's larger than or equal to 5 we round it to 10
 * (rounding to 10 means increasing the next significant digit
 * by 1). The process stops immediately once there is only one
 * non-zero digit left.
 * 
 * Example
 * 
 * For value = 15, the output should be
 * rounders(value) = 20;
 * 
 * For value = 1234, the output should be
 * rounders(value) = 1000.
 * 
 * 1234 -> 1230 -> 1200 -> 1000.
 * 
 * For value = 1445, the output should be
 * rounders(value) = 2000.
 * 
 * 1445 -> 1450 -> 1500 -> 2000.
 */
rounders = value => {
    let mod = 10;
    while (mod < value) {
        // get value to round
        let rem = (value % mod);
        
        // round up if needed (by adding 1 to next digit)
        if (rem > 4 * (mod/10))
            value += mod;
        
        // round down current level
        value -= rem;
        
        // increase mod
        mod *= 10;
    }
    return value;
}
