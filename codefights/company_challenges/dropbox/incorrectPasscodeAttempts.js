/**
 * Name: Incorrect Passcode Attempts
 * Difficulty: Easy, 5 minutes
 * Time: 3:26
 */
// original solution:
function incorrectPasscodeAttempts(passcode, attempts) {
    // loop through all attempts
    return attempts.reduce(([locked, count], attempt) => {
        // if was locked before, remain locked & skip below logic
        if (locked) return [locked];
        else {
            // wasn't locked, and passcode correct - reset count
            if (attempt === passcode) return [false, 0];
            else {
                // wasn't locked, passcode failed, increment counter
                count++;
                // if failed 10 times, lock
                if (count >= 10) return [true];
                // else, return incremented count
                else return [false, count];
            }
        }
    }, [false, 0])
    // get first element from array (if locked)
    [0]
}
