// Name: fibFib
// URL: https://codefights.com/challenge/Luj5vxFRkDp6WXuMW
d = (a,b,c) => b ** 2 < c ? d(b, a+b, c) : b ** 2 == c ? 1 : 0
fibFib = f => !f || d(0,1,f)