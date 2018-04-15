/**
 * Name: Arithmetic Expression
 * Core Arcade #: 13
 * 
 * Consider an arithmetic expression of the form a#b=c. Check whether
 * it is possible to replace # with one of the four signs: +, -, * or
 * / to obtain a correct expression.
 * 
 * Example
 * 
 * For a = 2, b = 3 and c = 5, the output should be
 * arithmeticExpression(a, b, c) = true.
 * 
 * We can replace # with a + to obtain 2 + 3 = 5, so the answer is true.
 * 
 * @param {any} a 
 * @param {any} b 
 * @param {any} c 
 * @returns 
 */
function arithmeticExpression(a, b, c) {
    return a + b == c ||
        a - b == c ||
        a * b == c ||
        a / b == c
}
