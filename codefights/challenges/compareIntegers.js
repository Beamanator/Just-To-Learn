/**
 * Name: Compare Integers
 * Challenge Date: 13 Apr 2018
 * 
 * Compare two integers given as strings.
 * 
 * Examples
 * 
 * For a = "12" and b = "13", the output should be
 * compareIntegers(a, b) = "less";
 * 
 * For a = "875" and b = "799", the output should be
 * compareIntegers(a, b) = "greater";
 * 
 * For a = "1000" and b = "1000", the output should be
 * compareIntegers(a, b) = "equal".
 */
compareIntegers = (a, b) =>
    +a > +b ? 'greater' :
    +a < +b ? 'less' :
    'equal'