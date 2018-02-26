// Name: bijectiveNumeration
// URL: https://codefights.com/challenge/RZk6w4GRGHCma6ym4
bijectiveNumeration = (n, m) => {
    c = n % 100
    i = ~~ (n / 100)
    d=c+i
    
    return `${m[i]}-${d<2?'0'+d:d}`
}
