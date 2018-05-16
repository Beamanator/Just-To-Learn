/**
 * Name: Count Black Cells
 * Core Arcade #: 34
 * 
 * Imagine a white rectangular grid of n rows and m columns divided into
 * two parts by a diagonal line running from the upper left to the lower
 * right corner. Now let's paint the grid in two colors according to the
 * following rules:
 * 
 * A cell is painted black if it has at least one point in common with the
 * diagonal;
 * Otherwise, a cell is painted white.
 * Count the number of cells painted black.
 * 
 * Example
 * 
 * For n = 3 and m = 4, the output should be
 * countBlackCells(n, m) = 6.
 * 
 * There are 6 cells that have at least one common point with the diagonal
 * and therefore are painted black.
 * 
 * [diagram online]
 * 
 * For n = 3 and m = 3, the output should be
 * countBlackCells(n, m) = 7.
 * 
 * 7 cells have at least one common point with the diagonal and are painted
 * black.
 * 
 * [diagram online]
 */
// fn from https://stackoverflow.com/questions/4652468/is-there-a-javascript-function-that-reduces-a-fraction
reduce = (numerator,denominator) => {
    var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd, gcd];
}

// my function
countBlackCells = (n, m) =>
    (
        ( [a,b,c]=reduce(n, m) )[0] + b - 1
    ) * c + 2 * (c - 1)
