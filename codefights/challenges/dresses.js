/**
 * Name: Dresses
 * Date: 24 Oct 2018
 * Difficulty: 1000
 */
// 120 chars
P = n => parseInt(n, 16)
dresses = C =>
    C.reduce(
        (c, e, i) =>
            (
                P(e[2] + e[3]) > P(e[0] + e[1]) &&
                P(e[2] + e[3]) > P(e[4] + e[5])
            ) ? c.concat(i) : c,
        []
    )
