/**
 * Description: Avoid using built-in functions to solve this challenge.
 * Implement them yourself, since this is what you would be asked to
 * do during a real interview.
 * 
 * Implement a function that takes two strings, s and x, as arguments
 * and finds the first occurrence of the string x in s. The function
 * should return an integer indicating the index in s of the first 
 * occurrence of x. If there are no occurrences of x in s, return -1.
 */

// Note: could do return s.indexOf(x);
//  but we're trying to 'practice'
findFirstSubstringOccurrence = (s, x) =>
    // 1) split string based on substring
    // 2) get first element of resulting array
    // 3.1) if first elem matches orig string, not found
    // 3.2) else, found - return length of string BEFORE
    //      matching 'x' (a.k.a. index where 'x' is found)
    (I=s.split(x)[0]) === s ? -1 : I.length