/**
 * Name: Replace Middle
 * Core Arcade #: 41
 * 
 * We define the middle of the array arr as follows:
 * 
 * if arr contains an odd number of elements, its middle is the
 * element whose index number is the same when counting from the
 * beginning of the array and from its end;
 * 
 * if arr contains an even number of elements, its middle is the
 * sum of the two elements whose index numbers when counting from
 * the beginning and from the end of the array differ by one.
 * 
 * Given array arr, your task is to find its middle, and, if it
 * consists of two elements, replace those elements with the value
 * of middle. Return the resulting array as the answer.
 * 
 * Example
 * 
 * For arr = [7, 2, 2, 5, 10, 7], the output should be
 * replaceMiddle(arr) = [7, 2, 7, 10, 7].
 * 
 * The middle consists of two elements, 2 and 5. These two elements
 * should be replaced with their sum, i.e. 7.
 * For arr = [-5, -5, 10], the output should be
 * replaceMiddle(arr) = [-5, -5, 10].
 * 
 * The middle is defined as a single element -5, so the initial array
 * with no changes should be returned.
 */
replaceMiddle = a =>
    a.slice( 0, M = Math.ceil( (L=a.length)/2)-1 )
    .concat(
        a[M] + (L % 2 == 0 ? a[ ~~(L/2) ] : 0)
    )
    .concat(
        a.slice( ~~(L/2)+1 )
    )