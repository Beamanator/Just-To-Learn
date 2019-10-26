/**
 * Name: Equation Solution
 * Date: 26 Oct 2019
 * Difficulty: 2000
 * Solution length: 116 chars
 */

equationSolutions = (l, r) => {
    c = 0
    for (i = l; i <= r; i++) {
        for (j = i; j <= r; j++) {
            if (i ** 3 == j ** 2) c++
            if (i !== j && j ** 3 == i ** 2) c++
        }
    }
    return c
}
