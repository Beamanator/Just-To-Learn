/**
 * Name: Curve Grades
 * Date: 1 Oct 2018
 * Reverse Challenge
 */
// 297 chars
// standard dev = sqrt(difference of each num to mean, squared)
curveGrades = p =>
    // calculate mean - add to end of 'p'
    p.reduce((o, n, i) =>
        i == p.length - 1
            ? p.concat((o + n) / p.length)
        : o + n
    , 0)
    // sum of square of each elem's difference from mean
    .reduce((o, n, i, m) =>
        i < p.length
            ? o + (n - m[p.length]) ** 2
        : p.concat(
            // keep the average in the next part ;)
            n,
            // divide by N - 1 (sample standard deviation)
            Math.sqrt( o / (p.length - 1) )
        )
    , 0)
    // calculate grades now
    .map((e, i, s) => {
        let M = s[s.length - 2]
        let D = s[s.length - 1]
    
        return i < p.length
            ? e < M - 2 * D 
                ? 'F'
            : e < M - D
                ? 'D'
            : e < M
                ? 'C'
            : e > M + D
                ? 'A'
            : 'B'
        : 0
    })
    // filter 2 at the end? or slice (.slice(0, p.length))
    .filter(e => e)