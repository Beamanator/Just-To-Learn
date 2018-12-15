/**
 * Name: Multi Divisor Sequence
 * Date: 15 Dec 2018
 * Difficulty: 2000
 */

// 97 chars
multiDivisorSequence = N =>
    N.reduce(
        (o, n, i) =>
            // check if break in sequence exists already
            o != -1
                // return that break if it exists
                ? o :
                // otherwise, look for a break
                    // skip index 0
                    !i ||
                    // look 2 behind to see if current num is multiple
                    (N[i-2] && n % N[i-2] == 0) ||
                    // look 1 behind to see if current num is divisor
                    N[i-1] % n == 0
                        // keep default -1 if no break yet
                        ? -1
                        // otherwise, return break in the sequence
                        : n,
        // begin default as -1
        -1
    )