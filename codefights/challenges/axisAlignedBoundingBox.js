// Name: axisAlignedBoundingBox
// URL: https://codefights.com/challenge/Mwdp95GGbHdy8nDDM
s = (a, b) => a - b
L = l => l.sort(s).pop() - l[0]
axisAlignedBoundingBox = (x, y) => L(x)*L(y)