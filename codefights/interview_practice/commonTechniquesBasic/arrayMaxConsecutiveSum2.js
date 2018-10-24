/**
 * Name: Array Max Consecutive Sum 2
 * Difficulty: Easy (30 min)
 * Time: waaaaay too long...
 */
function arrayMaxConsecutiveSum2(inputArray) {
    let max, runningTot = 0, hasPositives = false;
    
    // first check if positives exist
    inputArray.forEach(e => {
        if (e > 0) hasPositives = true;
    });
    
    if (!hasPositives) {
        return inputArray.sort()[0]
    } else {
        max = inputArray[0];
        inputArray.forEach((e, i) => {
            // if e is negative and more negative than the current running total, clear everything out and start over
            if (e < 0 && (-1 * e) >= runningTot) {
                runningTot = 0;
            } else {
                runningTot += e;
                if (runningTot > max) max = runningTot;
            }
        });

        return max;
    }
}
