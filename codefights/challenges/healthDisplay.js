/**
 * Name: Health Display
 * Difficulty: 2000
 * Date: 13 Nov 2018
 */
// 331 chars
// heart pieces
_ = ["    ", "    ", "    "]
$ = [" ",    " ",    " "   ]
T = [" ** ", "****", "****"]
L = [" ***", "  **", "   *"]
R = ["*** ", "**  ", "*   "]
// adding heard pieces together (side by side)
A = (a, ...b) => a.map(
    (e, i) => {
        for (B of b) e += B[i]
        return e
    }
)
// main function
healthDisplay = (h, m) =>
    // calculate top half
    A(
        // x = top-left heart piece (T)
        (x = 3 * h / m) > 0 ? T : _,
        // a = top-right heart piece (T)
        (a = x - .75) > 0 ? T : _,
        // $ = spacer between hearts
        $,
        x > 1 ? T : _,
        a > 1 ? T : _,
        $,
        x > 2 ? T : _,
        a > 2 ? T : _
    )
    // add on bottom half
    .concat(A(
        // b = bottom-left heart piece (L)
        (b = x - .25) > 0 ? L : _,
        // c = bottom-right heart piece (R)
        (c = x - .5) > 0 ? R : _,
        $,
        b > 1 ? L : _,
        c > 1 ? R : _,
        $,
        b > 2 ? L : _,
        c > 2 ? R : _
    ))