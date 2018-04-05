/**
 * The Champernowne constant C10 is defined by concatenating
 * representations of successive integers: 12345678910111213....
 * 
 * Given an integer n, find the nth digit (1-based) of C10.
 * 
 * My solution:
 * 1) Create an array of length n in new array
 * 2) set every value of array to index + 1 (start with 1 instead of 0)
 * 3) join array with empty strings
 * 4) get n-1(th) index
 */
champernowneDigit = n => +[...Array(n)].map((e,i) => i+1).join('')[n-1]
