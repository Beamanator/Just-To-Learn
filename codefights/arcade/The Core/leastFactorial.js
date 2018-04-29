/**
 * Name: Least Factorial
 * Core Arcade #: 25
 * 
 * Given an integer n, find the minimal k such that
 * 
 * k = m! (where m! = 1 * 2 * ... * m) for some integer m;
 * k >= n.
 * 
 * In other words, find the smallest factorial which is not 
 * less than n.
 */
leastFactorial = (n, t=1, i=1) => 
    t * i >= n ? t * i : leastFactorial(n, t * i, ++i)

// slightly longer:
function leastFactorial(n, t=1, i=1) {
    if (t * i >= n) return t * i;
    else return leastFactorial(n, t * i, ++i);
}