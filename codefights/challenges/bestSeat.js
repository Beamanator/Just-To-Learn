/**
 * Name: Best Seat
 * Date: Oct 8 2018
 * Difficulty: 2000
 */
// chars: 273
o = (m, r, c) => m[r] == (u=undefined) || (v=m[r][c]) == u || v == -1 ? 0 : v

bestSeat = L =>
    L.reduce((O, R, r) => {
        [,,f] = O
        R.forEach((s, c) => {
            // if seat is open (-1), calculate this seat's friendliness
            if (s == -1 && 
                (F=
                    o(L,r-1,c-1) + o(L,r-1,c) + o(L,r-1,c+1) +
                    o(L,r  ,c-1) +              o(L,r  ,c+1) +
                    o(L,r+1,c-1) + o(L,r+1,c) + o(L,r+1,c+1)
                ) > f
            ) {
                O = [r, c, (f=F)]
            }
        })
        return O
    }, [-1, -1, -1] /* [row, col, max] */)

    .slice(0, 2)