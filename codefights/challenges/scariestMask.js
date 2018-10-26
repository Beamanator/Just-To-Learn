/**
 * Name: Scariest Mask
 * Difficulty: 1000
 * Date: 26 Oct 2018
 */
// 110 chars
scariestMask = m =>
    m.reduce(
        (t, r) => t + r.split``.reduce(
            (T, c, i) => T + (i < r.length / 2 ? r[i] == r[r.length - 1 - i] ? 0 : 1 : 0),
            0
        ),
        0
    )