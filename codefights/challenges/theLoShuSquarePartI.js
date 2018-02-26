// Name: theLoShuSquarePartI
// URL: https://codefights.com/challenge/2wT8P8ghQqtzt9DHa
l = (s, y) => (s-=y%9) > 0 ? s : 9+s;
theLoShuSquarePartI = y => [
        [l(1,y),l(6,y),l(8,y)],
        [l(9,y),l(2,y),l(4,y)],
        [l(5,y),l(7,y),l(3,y)]
    ]
