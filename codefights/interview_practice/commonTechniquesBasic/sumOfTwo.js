/**
 * Name: Sum of Two
 * Date: 10 Oct 2018
 * Time: 59:40? (Had to learn about Sets)
 */
function sumOfTwo(a, b, v) {
    // given by Codefights:
    // method 1: works, but exceeds execution time limit
    //     for (i in a) {
    //         let valA = a[i];
    //
    //         let diff = v - valA;
    //
    //         if (b.includes(diff))
    //             return true;
    //     }
    //     return false;

    // convert arrays to sets
    let [A, B] = [new Set(a), new Set(b)];
    
    let found = false;
    
    // loop through set A, looking for difference in set B
    A.forEach(e => {
        if (found) return; // quit early if match already found
        if (B.has(v - e)) found = true;
    });
    
    return found;
}
