/**
 * Name: Is lucky
 * Difficulty: 1000
 * Time: 3:30
 */
function isLucky(n) {
    // convert number to a string
    n = n + '';
    
    // length is always even, so get size of each half
    let size = n.length / 2;
    
    // init 1st half sum and 2nd half sum variables
    let sum1 = 0, sum2 = 0;
    
    // calculate sum of 1st half
    for (let i = 0; i < size; i++) {
        sum1 += +n[i];
    }
    
    // calculate sum of 2nd half
    for (let i = size; i < 2 * size; i++) {
        sum2 += +n[i];
    }
    
    // true (lucky) if sums are equal, false (not lucky) otherwise
    return sum1 == sum2;
}
