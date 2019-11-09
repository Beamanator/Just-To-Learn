/**
 * Name: Matrix Trace
 * Difficulty: 2000
 * Date: 29 Oct 2019
 * Chars: 51
 */

i = 0
matrixTrace = m =>
    m[i] ? m[i][i] + matrixTrace(m, ++i) : 0
