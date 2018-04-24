/**
 * Name: Mirror Bits
 * Core Arcade #: 20
 * 
 * Reverse the order of the bits in a given integer.
 * 
 * Example
 * 
 * For a = 97, the output should be
 * mirrorBits(a) = 67.
 * 
 * 97 equals to 1100001 in binary, which is 1000011 after mirroring,
 * and that is 67 in base 10.
 * 
 * For a = 8, the output should be
 * mirrorBits(a) = 1.
 */
mirrorBits = a =>
    // get integer (base 10) from string (base 2)
    parseInt(

        // convert integer to base 2 string
        a.toString(2)
            
            // split into array of chars
            .split('')

            // reverse array
            .reverse()

            // re-create reversed string
            .join('')
        , 2
    )