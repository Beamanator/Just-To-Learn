/**
 * Name: Parking Cost
 * Date: 26 Oct 2019
 * Difficulty: 2000
 * Solution length: 117 chars
 */

// extracted consts / functions to save chars
s = 'substr'
T = t => +t[s](0,2) * 60 + +t[s](3)
c = Math.ceil

parkingCost = (I, O) =>
    // calculate total number of minutes (minus 30 free minutes)
    (M = T(O) - T(I) - 30) < 1
        ? 0 // if less than 1 (total less than 31), it's all free :D
        : M < 91
            ? c(M / 10) // <= 2 hours
            : 9 + c((M - 90) / 10) * 2 // > 2 hours

