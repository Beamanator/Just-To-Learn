/**
 * Name: Circle of numbers
 * Difficulty: 2000
 * Date: 8 July 2019
 */
// 40 chars
// circleOfNumbers = (n, f) => f < (A = n / 2) ? f + A : f - A

// 40 chars
// circleOfNumbers = (n, f) => f < n/2 ? f + n/2 : f - n/2

// 32 chars (minimum)
circleOfNumbers = (n,f) => (n / 2 + f) % n