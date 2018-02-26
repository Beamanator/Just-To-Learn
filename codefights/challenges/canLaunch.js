// Name: canLaunch
// URL: https://codefights.com/challenge/ydSeEtfrStphrEhAF
f = (a,b,c) => a == c ? 1 : (a+4+3*b <= c) ? f(a+4+3*b,b+1,c) : 0
canLaunch = n => f(1,0,n)
