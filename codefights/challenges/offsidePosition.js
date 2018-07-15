/**
 * Name: Offside Position
 * Date: 15 July 2018
 */
// 140 chars:
offsidePosition = t => {
    t[0].sort((a,b) => a-b);
    t[1].sort((a,b) => a-b);
    
    return t[1][0] < t[0][0] || t[1][0] < t[0][1] ||
        t[0][10] > t[1][10] || t[0][10] > t[1][9]
}

// 117 chars:
s = a => a.sort((a,b) => a-b)
offsidePosition = t =>
    s(t[1])[0] < s(t[0])[0] || t[1][0] < t[0][1] ||
      t[0][10] >   t[1][10] || t[0][10] > t[1][9]