/**
 * Name: Circle of Numbers
 * Core Arcade #: 6
 * 
 * Consider integer numbers from 0 to n - 1 written down along the
 * circle in such a way that the distance between any two neighbouring
 * numbers is equal (note that 0 and n - 1 are neighbouring, too).
 * 
 * Given n and firstNumber, find the number which is written in the
 * radially opposite position to firstNumber.
 * 
 * Example
 * 
 * For n = 10 and firstNumber = 2, the output should be
 * circleOfNumbers(n, firstNumber) = 7.
 * 
 * [Also see diagram online]
 * 
 * @param {any} n 
 * @param {any} firstNumber 
 * @returns 
 */
function circleOfNumbers(n, firstNumber) {
    // Math for 2nd 1/2 of circle
    if (firstNumber >= n / 2) {
        return firstNumber - n / 2;
    }
    
    // Math for 1st 1/2 of circle
    else {
        return firstNumber + n / 2;
    }
}
