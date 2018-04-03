/**
 * Name: christmasToys
 * 
 * Desc: On a cool Christmas tree the placement of toys is very important.
 * There are several levels of toys, with exactly one toy at the topmost level.
 * Every toy is connected to exactly one toy at the level directly above
 * (but for the topmost toy) and to some (maybe none) toys at the level directly below.
 * 
 * Each toy has its unique number in range from 0 to n - 1 . The topmost
 * toy has number 0.
 * Now that it's time to take the Christmas tree down, the toys should be
 * stored away carefully. Toys from the same level should be put into one
 * box so that the leftmost toy on that level is the first in the box, the
 * second from the left is the second in the box etc.
 * 
 * Knowing how the toys are connected, determine how they should be stored.
 * 
 * Example
 * 
 * For toys = [[6, 2, 4], [], [], [], [5, 1], [], [3]], the output should be
 * christmasToys(toys) = [[0], [6, 2, 4], [3, 5, 1]].
 * 
 * The toys' positions are shown in a picture online
 * 
 */
christmasToys = t => {
    let m = {}, p = [[0]]
    
    for (let i = 0; i < t.length; i++)
        m[i] = t[i]

    
    let i = 0
    do {
        for (let u of p[i]) {
            let d = m[u]
            
            if (d.length == 0) continue
            else if (!p[i + 1]) {
                p[i + 1] = d
            } else {
                p[i + 1] = [...p[i + 1], ...d]
            }
            
        }
        
        i++
    } while (p[i])
    
    return p
}

// much more readable:
// function christmasToys(toys) {
//     let map = {};
//     let positions = [[0]];
    
//     for (let i = 0; i < toys.length; i++) {
//         map[i] = toys[i];
//     }
    
//     let index = 0;
//     do {
//         let nextLevelArr = positions[index];
//         for (let num of nextLevelArr) {
//             let mapped = map[num];
            
//             if (mapped.length == 0) continue;
//             else if (positions[index + 1] == undefined) {
//                 positions[index + 1] = mapped;
//             } else {
//                 positions[index + 1] = [...positions[index + 1], ...mapped];
//             }
            
//         }
        
//         index++;
//     } while (positions[index] !== undefined);
    
//     return positions;
// }

