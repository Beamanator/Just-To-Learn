// Name: nextSecond
// URL: https://codefights.com/challenge/JKPD7LqN2fwkDWeFB
nextSecond = c => c[2] > 58 ? c[1] > 58 ? c[0] > 22 ? [0,0,0] : [c[0]+1,0,0] : [c[0], c[1]+1, 0] : [c[0], c[1], c[2]+1]