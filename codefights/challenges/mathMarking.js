/**
 * Name: Math Marking
 * Date: Oct 8 2018
 * Difficulty: 2000
 * Type: Reverse challenge
 */
// 124 chars
mathMarking = S =>
    // split solution string on equals sign
    S.split('=')
    // loop through equations, checking if solutions match next solution
    .reduce(([p, c, t], e, i, q) => 
        // return '0 / 0' (no equations) - apparently this test case
        // -> isn't needed, even though it's possible to have an empty
        // -> solution "S", right??
        // if (!e) return [0, 0, 0]
        // return updated vals
        [E=eval(e), p == E ? c+1 : c, i < q.length-1 ? t + 1 : t]
    , [, 0, 0]) // [prev (p), correct (c), tot (t)]
    .slice(1, 3)
    .join(' / ')

// original - 224 chars?    
// mathMarking = S =>
//     // split solution string on equals sign
//     S.split('=')
//     .map(e => e.trim())
//     .reduce(([prev, correct, tot], e, i, eqs) => {
//         // return '0 / 0' (no equations)
//         if (!e) return [0, 0, 1]
//         // evaluate current equation
//         let curr = eval(e)
//         // check if current solution is equal to previous
//         if (prev && prev === curr) correct++
//         // return updated vals
//         return [curr, correct, i < eqs.length-1 ? tot + 1 : tot]
//     }, [, 0, 0]) // [prev, tot, correct]
//     .slice(1, 3)
//     .join(' / ')