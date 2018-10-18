/**
 * Name: Find Profession
 * Difficulty: Easy (20 min)
 * Time: 35:15
 */
function findProfession(level, pos) {
    let countEvens = 0;
    
    while (level > 1) {
        // if even, count it!
        if (pos % 2 == 0) {
            countEvens++;
        }
        // else, make position even by adding 1 - so it survives into next round easily
        else {
            pos++;
        }

        level--; // move to earlier level
        pos /= 2; // find next position
    }
    
    // if # of evens is... odd, he's a Doctor - even evens is Engineer
    return countEvens % 2 ? 'Doctor' : 'Engineer'
}
