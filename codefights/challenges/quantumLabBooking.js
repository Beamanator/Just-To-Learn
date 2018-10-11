/**
 * Name: Quantum Lab Booking
 * Date: 11 Oct 2018
 * Difficulty: 2000
 */
quantumLabBooking = (f, o, k) => {
    // set up array where all students are stored (l) + init other vars
    l = [o], c = i = 0
    
    // stop looping when the count exceeds max count
    while (c < k) {
        a = []
        
        // start where last left off, increment until the end of l's length
        for (; i < l.length; i++) {
            // get matrix row corresponding to this friend #
            n = f[l[i]]
                // convert 1's to index (friend #) and 0's go to -1
                .map((e,i) => e ? i : -1)
                // filter out -1's since they're not needed from here
                .filter(e => e !== -1)
            
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
