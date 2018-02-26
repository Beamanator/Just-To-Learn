// Name: wallisFormula
// URL: https://codefights.com/challenge/azd6EW4kNbC3B3Qqi
function wallisFormula(n) {
    var t = 1,
        i = 1;
    
    if (n % 2 === 1)
        i++;
    else
        t = Math.PI/2;
    
    for (; i < n; i += 2) {
        t *= i / (i+1);
    }
    
    return t;
}
