/**
 * Name: Game With Points On The Plane
 * Difficulty: 3000
 * Date: 29 Dec 2018
 */
// 194 chars
// make some global variables
m = Math
a = m.abs
c = f = 0
// function 'n' is used to check for failing arrays
// fails if arr has any distance from (0,0) equal to 0 or if
// distance doesn't outrun # of moves
n = (e) => {
    e.forEach(([x]) => {
        if (!x) f = 1
        if (x <= c) f = 1
        c++
    })
    return f ? [] : e
}
// main
gameWithPointsOnThePlane = P =>
    // calculate if function passes for now
    n(
        // map distance from (0,0) with index (for later)
        P.map(([x, y], i) => [m.max(a(x), a(y)), i])
        // sort by smallest distance first
        .sort((a,b) => a[0]-b[0])
    )
    // get indices from original mapping
    .map(([,y]) => y)

