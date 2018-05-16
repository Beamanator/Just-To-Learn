/**
 * Name: Array Replace
 * Core Arcade #: 36
 * 
 * Given an array of integers, replace all the occurrences of
 * elemToReplace with substitutionElem.
 * 
 * Example
 * 
 * For inputArray = [1, 2, 1], elemToReplace = 1 and substitutionElem = 3,
 * the output should be
 * arrayReplace(inputArray, elemToReplace, substitutionElem) = [3, 2, 3].
 */
arrayReplace = (a, r, s) =>
    a.map(e => e == r ? s : e);