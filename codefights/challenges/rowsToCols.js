/**
 * Name: Rows To Cols
 * Reverse Challenge
 * 17 July 2018
 */
rowsToCols = r =>
    // convert to binary
    r.map(e => e.toString(2))

    // add leading zeros
    .map(e => '0'.repeat(r.length - e.length) + e)
    
    // convert to columns
    .reduce((t, _, i, a) => 
        t.concat(
            // get specific number of specific column
            // at this point, i = column #, I = index in each binary str
            a.reduce((T, _, I, A) => T + A[I][i], '')
        ), [])

    // convert back to integer
    .map(e => parseInt(e, 2))