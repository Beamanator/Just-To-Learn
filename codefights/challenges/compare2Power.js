// Name: compare2Power
// URL: https://codefights.com/challenge/232L7JtNciBKFfQuS

m=Math.log
compare2Power = m => {    
    A = m[2]**m[3],
        B = (m[6]**m[7])*l(m[5], m[1]) + l(l(m[4], m[0]), m[1]);
    
    return A > B ? 1 : A == B ? 0 : -1;
}
l = (n, b) => m(n)/m(b)
