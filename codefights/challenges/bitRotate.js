/**
 * Name: bitRotate
 * Date: 23 Apr 2018
 * Description:
 * In this challenge, you will work with 31 bit integer only.
 * Provided a non-negative integer n and rotate number r. Your
 * mission is to do the left or right rotate base on its sign.
 * If r ≥ 0, rotate n to left s steps or else rotate n to right.
 * 
 * Example
 * 
 * For n = 5 and r = 1, the output should be
 * bitRotate(n, r) = 10.
 * We all know that 5(10) is 0000000000000000000000000000101(2).
 * By rotate n to left 1 step, we get
 * 0000000000000000000000000001010(2), which is 10(10).
 * 
 * For n = 1073741825 and r = -2, the output should be
 * bitRotate(n, r) = 805306368.
 * 1073741825(10) is 1000000000000000000000000000001(2),
 * rotate n to right 2 steps, we get
 * 0110000000000000000000000000000(2), which is 1805306368(10).
 */
p = s => '0'.repeat(31 - s.length) + s;
function bitRotate(n, r) {
    r %= 31;
    n = p(n.toString(2));
    
    if (r > 0)
        n = (
            n.substr(r, n.length - r) +
            n.substr(0, r)
        );
    else
        n = (
            n.substr(n.length + r) +
            n.substr(0, n.length + r)
        );
    
    return parseInt(n, 2);
}