// Name: pride
// Type: reverse challenge
function pride(n, f) {
    // step 1: if n is divisible by 10, return n/10
    if (n % 10 == 0)
        return [n, ...pride(n/10, 1)];
    
    // step 2.1: if n is divisible by 2 && last number was doubled (3.2)
    if (n % 2 == 0 && f == 2)
        return [n];
    
    // step 2.2: if n is divisible by 2, return n/2
    if (n % 2 == 0)
        return [n, ...pride(n/2)];
    
    // step 3.1: n is odd - if n is less than 10 && last number wasn't divided by 10, return n
    if (n < 10 && !f)
        return [n];
    
    // step 3.2: n is odd - if n is less than 10 && last number WAS divided by 10, double n
    if (n < 10 && f)
        return [n, ...pride(n*2, 2)];
    
    // medium step: get sum of digits
    let tot = 0, N = n;
    while (N > 0) {tot += N%10; N = Math.floor(N/10);}
    
    // step 4.1: n is odd & > 10. if n < 10,000 add sum of digits
    if (n < 10000)
        return [n, ...pride(n+tot)];
    
    // step 4.2: n is odd & > 10,000. subtract sum of digits
    else
        return [n, ...pride(n-tot)];
}
