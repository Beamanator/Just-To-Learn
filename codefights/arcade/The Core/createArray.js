/**
 * Name: Create Array
 * Core Academy #: 35
 * 
 * Given an integer size, return array of length size
 * filled with 1s.
 * 
 * Example
 * 
 * For size = 4, the output should be
 * createArray(size) = [1, 1, 1, 1].
 * 
 */
createArray = s =>
    // create new array w/ len s
    [...Array(s)]
    
    // map all values to 1
    .map(e => 1)