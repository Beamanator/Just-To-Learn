/**
 * Name: Wailing Ghosts
 * Difficulty: 2000
 * Date: 25 Oct 2018
 * Note: Not going for smallest char count, just readability 
 */
function wailingGhosts(sounds) {
    let leftOCount = 0, rightOCount = 0, left = true, isWail = true;
    
    for (let char of sounds) {
        // left of 'u's now
        if (left) {
            // logic for dealing with 'u' char
            if (char == 'u') {
                // on the left, but no 'o's so fail
                if (leftOCount == 0) isWail = false;
                else left = false; // swap to right side
            }
            // else char is 'o'
            else {
                leftOCount++;
            }
        }
        // else, on the right of 'u's
        else {
            // log for dealing with right-side 'o's
            if (char == 'o') {
                // count right 'o's up to same # of left 'o's
                if (rightOCount + 1 < leftOCount) rightOCount++;
                // once right 'o's exceed left 'o's, assume it's the next left 'o'
                else {
                    left = true; // swap to left side;
                    leftOCount = 0;
                    rightOCount = 0;
                }
            }
            // else char is 'u'
            else {} // do nothing
        }
        // console.log(leftOCount, rightOCount, left)
    }
    
    if (leftOCount > 0) isWail = false;
    
    return isWail
}
