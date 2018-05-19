/**
 * Name: Remove Array Part
 * Core Arcade #: 39
 * 
 * Remove a part of a given array between given 0-based indexes
 * l and r (inclusive).
 * 
 * Example
 * 
 * For inputArray = [2, 3, 2, 3, 4, 5], l = 2 and r = 4, the
 * output should be
 * removeArrayPart(inputArray, l, r) = [2, 3, 5].
 */
removeArrayPart = (a, l, r) =>
    a.filter((e, i) =>
        i < l || i > r)
