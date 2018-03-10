// Name: misplaced
/**
 * Enrico Mischievo is assigned the task of sending n invites for a birthday party.
 * Enrico has envelopes ready with addresses of the recipients on it. Enrico, being
 * a prankster, inserts each invite into a randomly chosen envelope and mails it.
 * What is the probability of every recipient receiving the wrong invite?
 * 
 * Example
 * For n = 3, the output should be misplaced(n) = 0.333333.
 * There are 3 invites i1, i2 and i3 to be sent in corresponding envelopes e1, e2 and e3.
 * These are the ways in which every recipient receives the wrong invite:
 * 
 * i1 --> e3,i2 --> e1,i3 --> e2;
 * i1 --> e2,i2 --> e3,i3 --> e1.
 * 
 * In the first case invite i1 is inserted in the envelope e3, i2 in e1 and i3 in e2.
 * We can achieve the same result with second case.
 * So, there are 2 ways in which this can happen. Since the total number of ways the
 * invites can be sent is 3! ways, the probability of every recipient receiving the
 * wrong invite is 2/3! = 0.333333.
 * 
 * Round the answer to 6 decimal places.
 * 
 */
// classic factorial (denominator)
r = n => n == 1 ? 1 : n*r(n-1);

// dearangement function (numerator)
// https://en.wikipedia.org/wiki/Derangement
m = n => n == 0 ? 1 : n*m(n-1) + (-1)**n;

// main fn
misplaced = n => m(n) / r(n);
