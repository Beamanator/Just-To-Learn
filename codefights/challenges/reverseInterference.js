/**
 * Name: Reverse Interference
 * Date: 20 Oct 2018
 * Difficulty: 2000
 */
function reverseInterference(originalA, originalB, broadcastA, broadcastB) {
    let consecutive = 0;
    let totalSwaps = 0;
    
    for (let i = 0; i < originalA.length; i++) {
        let brA = broadcastA[i], brB = broadcastB[i];
        let orA = originalA[i], orB = originalB[i];
        
        // no swaps needed
        if (brA == orA && brB == orB) {
            consecutive = 0;
            continue;
        }
        
        // swap needed
        if (brA == orB && brB == orA) {
            // still in same 'group' of swaps so not a new swap
            if (consecutive > 0 && consecutive < 3) consecutive++;
            // make a new group of swaps
            else {
                consecutive = 1;
                totalSwaps++;
            }
        }
        
        // quit entire loop early - swaps not possible
        else return -1;
    }
    
    return totalSwaps;
}
