/**
 * Name: Quantum Lab Correction
 * Date: 12 Oct 2018
 * Difficulty: 2000
 * Note: very similar to quantumLabBooking.js (related q's)
 */
// 287 chars
quantumLabCorrection = (f, o, k) => {
    // set up array where all students are stored (l) + init other vars
    l = [o], c = i = 0, h = new Array(f.length).fill(0)
    
    // New quicker piece: convert friend matrix (1's and 0's)
    // to friend index matrix (0's, 1's, ...) (was converted later)
    f = f.map(r => r.map((c, i) => c ? i : -1))
    
    // h[o] = 1 // not needed b/c current person in line doesn't count
    // a.k.a. current person can reserve a spot for him / herself in the future
    // if that person is not already scheduled in the future
    
    // stop looping when the count exceeds max count
    while (c < k) {
        // array of new friends to add
        a = []
        
        // start where last left off, increment until the end of l's length
        for (; i < l.length; i++) {
            // open up current person for future reserving
            h[l[i]] = 0
            
            // get matrix row corresponding to this friend #
            n = f[l[i]]
                // filter out -1's since they're not needed from here
                .filter(e => {
                    // NEW: filter out if they exist in holder 'h'
                    if (e !== -1 && h[e] !== 1) {
                        // NEW: save these people in holder
                        h[e] = 1;
                        return 1;
                    }
                    return 0;
                })
                
            // increment count by length of next friends to add
            c += n.length
            
            // add next friends on list to container arr
            a.push(...n)
        }
        
        // if we didn't add anybody last round, QUIT
        if (a.length == 0) return -1
        
        // push next friend list into overall friend list
        l.push(...a)
    }

    // return index of max student
    return l[k]
}
