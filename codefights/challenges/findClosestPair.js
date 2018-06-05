/**
 * Name: Find Closest Pair
 * Description:
 * Given an array of integers numbers, we'd like to find the closest
 * pair of elements that add up to sum. Return the distance between
 * the closest pair (absolute difference between the two indices).
 * If there isn't a pair that adds up to sum, return -1.
 * 
 * Example
 * 
 * For numbers = [1, 0, 2, 4, 3, 0] and sum = 5 the output should be
 * findClosestPair(numbers, sum) = 2. 1 and 4 have a sum of 5, but 2
 * and 3 are closer.
 * 
 * for numbers = [2, 3, 7] and sum = 8 the output should be
 * findClosestPair(numbers, sum) = -1. There are no pairs that have
 * a sum of 8.
 */
// 242 chars
Z = n => Math.abs(n)

F = (A, i) => {
    let m = Z(A[0] - i);
    for (let a of A) {
        let D = Z(a - i);
        if (D < m)
            m = D;

    }
    return m
}

/**
 * Next idea: build obj like this, and calculate sums on the way
 * {
    1: [0],
    2: [2],
    3: [4],
    4: [3],
    0: [1, 5]
 }
 */
findClosestPair = (N, S) =>
    N.reduce((O, e, i) => {
        // get minimum distance
        let d = S - e;
        if (O[d]) {
            let D = F(O[d], i)
            if (O.M == -1 || D < O.M)
                O.M = D;
        }
    
        // add element to O
        if (O[e]) {
            O[e].push(i);
        } else {
            O[e] = [i];
        }    
    
        return O;
    }, {M: -1}).M


// other solution - 122 chars but inefficient so fails :(
// findClosestPair = (N, S) =>
//     N.reduce((a, e, i, n) => {
//         n.slice(i + 1)
//         .forEach((E, I) => {
//             a = (e+E === S && (I+1 < a || a == -1)) ? I+1 : a
//         });
//         return a;
//     }, -1)
