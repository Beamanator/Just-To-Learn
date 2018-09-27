/**
 * Name: Smallest Component
 * Date: 25 Sept 2018
 * 589 Chars
 * Note: didn't have time to fully try to minimize number of chars
 */
// X is global array of touched values
X=0
/**
 * aI = array of index pairs (row, column)
 * a = array of values (M)
 * t = count (running total) - starts with 1
 * X is a global, and should be accessible here :)
 */
C = (aI, a, v) =>
    // loop through array indices of matching values
    aI.reduce(
        (o, [r, c]) => {
            X[r][c] = true;
            
            let nextI = [];
            
            // could easily shorten, but no time at the moment :(
            if (a[r-1] && a[r-1][c] == v && !X[r-1][c]) {
                X[r-1][c] = true
                nextI.push([r-1, c])
            }
            if (a[r+1] && a[r+1][c] == v && !X[r+1][c]) {
                X[r+1][c] = true
                nextI.push([r+1, c])
            }
            if (a[r][c-1] == v && !X[r][c-1]) {
                X[r][c-1] = true
                nextI.push([r, c-1])
            }
            if (a[r][c+1] == v && !X[r][c+1]) {
                X[r][c+1] = true
                nextI.push([r, c+1])
            }
            
            return o += C(nextI, a, v)
        },
        aI.length
    )
// Main function
smallestComponent = M =>
    // create new Matrix of touched values, same 
    (X=
        new Array(M.length).fill()
            .map(e => new Array(M[0].length)
            .fill(false))
    )
    // loop through each index, accessing M values
    .reduce(
        (min, R, r) => {
            R.forEach((_, c) => {
                // calculate component size if hasn't been touched yet
                if (!X[r][c]) {
                    // calculate component size at current index
                    let size = C([[r, c]], M, M[r][c])
                    // if size is smallest (at the moment), set it!
                    if (size < min) min = size
                }
            })
            return min
        },
        // initialize minimum as maximum num possible
        M.length * M[0].length
    )