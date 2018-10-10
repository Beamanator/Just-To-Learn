/**
 * Name: Contains Duplicates
 * Date: ?
 * Time: ?
 */
function containsDuplicates(a) {
    // given by codefights
    // takes too long:
    //     for (i in a) {
    //         let val = a[i];
    //
    //         if (a.indexOf(val, i+1) !== -1)
    //             return true
    //     }
    
    // my soln:
    let pos = [], neg = [];
    
    // loop through values in a
    for (let i in a) {
        let val = a[i];
        
        // if val is negative, negate & check if neg array has that value
        if (val < 0) {
            val *= -1;
            
            if (neg[val]) return true;
            else neg[val] = true;
        }
        
        // else, check if pos array has that value (set if not)
        else {
            if (pos[val]) return true;
            else pos[val] = true;
        }
    }
    
    // if here, no matches found
    return false;
}
