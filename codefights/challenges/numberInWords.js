/**
 * Name: Number In Words
 * Date: 26 July 2018
 * Goal = change 1234 to 'One thousand two hundred thirty-four', etc..
 */
B = 'teen'
O = {0: A = '', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine'}
T = {10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thir' + B, 14: O[4] + B, 15: 'fif' + B, 16: O[6] + B, 17: O[7] + B, 18: 'eigh' + B, 19: O[9] + B}
U = {2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty', 7: O[7] + 'ty', 8: O[8] + 'y', 9: 'ninety'}
numberInWords = N =>
    // make a new array with up to 3 groups - each group is 3 digits (millions, thousands, or ones's)
    (S = [...Array(L = Math.ceil((N = '' + N).length / 3))]
    
    // map groups of digits (millions, thousands, or one's) into each array element
    // -> also pad with leading '0's
    .map((_, i) =>
        ('0'.repeat((9 - N.length) % 3) + N).substr(i *= 3, i + 3))

    // reverse so the one's group is first, then thousand's, etc
    .reverse()

    // map each group to numbers in words
    .map((e, i) =>
    	// convert each group of digits
		e.split``.map((d, I, f) =>
			d == '0' ? A
            : I == 0 ?
				O[d] + ' hundred '
			: I == 1 && d == '1' ?
				T[+(d + f[2])]
            : I == 1 ?
				U[d] + (f[2] !== '0' ? '-' : A)
			: I == 2 && f[1] != '1' ?
				O[d]
			: A
        ).join``.trim()
		
        // add 'thousand' / 'million' ending
		+ (i == 1 && +e > 0 ?
            ' thousand'
        : i == 2 ?
            ' million'
        : A)
    )

    // reverse back so millions is first, then thousands, etc
    .reverse()

    // join elements up, remove excess whitespace
    .join(' ').trim())

    // capitalize first letter in full number
    [0].toUpperCase() + S.substr(1)