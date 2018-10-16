/**
 * Name: Jumping Jimmy
 * Date: 17 Oct 2018
 * Difficulty: 1000
 */
// 60 chars
jumpingJimmy = (t, h, b) =>
    t.reduce((s, l) =>
        s += l > h || b ? (b = 1) - 1 : l
    , 0)

// 62 chars
jumpingJimmy = (t, h, b) => {
    s = 0
    for (i of t) s += b || i > h ? (b = 1) - 1 : i
    return s
}

