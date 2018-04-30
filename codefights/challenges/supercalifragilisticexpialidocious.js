/**
 * Name: supercalifragilisticexpialidocious
 * Date: 29 Apr 2018
 * @param {*} s 
 */
// 149 chars
supercalifragilisticexpialidocious = s => {
    t = [], l = -1;
    while(1) {
        l = 'supercalifragilisticexpialidocious'
            .indexOf(s, l + 1);
        
        if (l == -1)
            break;
        else
            t.push(l)
    }
    
    return t
}

// 206 chars
// supercalifragilisticexpialidocious = s =>
//     Object({
//         a: [6, 11, 24],
//         c: [5, 19, 29],
//         d: [27],
//         e: [3, 20],
//         f: [9],
//         g: [12],
//         i: [8, 13, 15, 18, 23, 26, 30],
//         l: [7, 14, 25],
//         o: [28, 31],
//         p: [2, 22],
//         r: [4, 10],
//         s: [0, 16, 33],
//         t: [17],
//         u: [1, 32],
//         x: [21]
//     })[s] || []

// 146 chars
// function supercalifragilisticexpialidocious(s) {
//     return 'supercalifragilisticexpialidocious'
//         .split('')
//         .reduce((a, c, i) => {
//             c == s ? a.push(i) : 0
//             return a
//         }, []);
// }
