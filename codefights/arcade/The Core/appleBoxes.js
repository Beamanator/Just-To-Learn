/**
 * Name: Apple Boxes
 * Core Arcade #: 30
 * 
 * You have k apple boxes full of apples. Each square box of size m contains
 * m × m apples. You just noticed two interesting properties about the boxes:
 * 
 * The smallest box is size 1, the next one is size 2,..., all the way up
 * to size k.
 * Boxes that have an odd size contain only yellow apples. Boxes that have
 * an even size contain only red apples.
 * Your task is to calculate the difference between the number of red apples
 * and the number of yellow apples.
 * 
 * Example
 * 
 * For k = 5, the output should be
 * appleBoxes(k) = -15.
 * 
 * There are 1 + 3 * 3 + 5 * 5 = 35 yellow apples and 2 * 2 + 4 * 4 = 20
 * red apples, making the answer 20 - 35 = -15.
 */
// slimmed:
appleBoxes = k =>
    // even box sizes
    [...Array( (k - k%2) / 2 )]
    .reduce((a, _, i) => a + ((i+1)*2)**2, 0)
    // get difference
        -
    // odd box sizes
    [...Array( ~~(k/2) + (k%2) )]
    .reduce((a, _, i) => a + ((i+1)*2 - 1)**2, 0)

// expanded:
// function appleBoxes(k) {
//     let a = [...Array( ~~(k/2) + (k%2) )]
//         .reduce((a, _, i) => {
//             return a + ((i+1)*2 - 1)**2
//         }, 0)
    
    
//     let b = [...Array( (k - k%2) / 2 )]
//         .reduce((a, _, i) => {
//             return a + ((i+1)*2)**2
//         }, 0)
    
//     return b - a;
// }