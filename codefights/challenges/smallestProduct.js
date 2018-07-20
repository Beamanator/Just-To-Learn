/**
 * Name: Smallest Product
 * 21 July 2018
 * I know this is messy, but that's ok this time
 */
// if anyone looks at this, shut up - i know it's messy.
smallestProduct = a => {
    A = a.sort((a,b) => a-b).reduce((o, e, i, a) => {
        if (e < 0 && o[0].length < 3)
            o[0].push(e)
        if (e >= 0)
            o[1].push(e)
        if (e == 0)
            o[2] = true
        return o
    }, [[], [], false])

    if (A[0].length == 0) {
        if (A[2]) return 0
        else return A[1][0] * A[1][1] * A[1][2]
    }
    if (A[0].length == 1) {
        return A[0][0] * A[1][A[1].length - 1] * A[1][A[1].length - 2]
    }
    if (A[0].length == 2) {
        return A[0][0] * A[1][A[1].length - 1] * (A[1].length < 2 ? A[0][1] : A[1][A[1].length - 2])
    }
    if (A[0].length == 3) {
        if (A[1].length == 0 || A[1].length == 1) return A[0][0] * A[0][1] * A[0][2]
        if (A[1].length > 1) {
            return Math.min(
                A[0][0] * A[0][1] * A[0][2],
                A[0][0] * A[1][A[1].length - 1] * A[1][A[1].length - 2]
            )
        }
    }
}