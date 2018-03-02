// Name: squaresNeeded
/**
 * Disclaimer: Math.ceil was only needed to fix a rounding error.
 */
squaresNeeded = (s, c, p) => Math.ceil((p*s+p*c-100*s)/(100-p))