/**
 * Name: Ada Number
 * Description:
 * Consider two following representations of a non-negative integer:
 * 
 * A simple decimal integer, constructed of a non-empty sequence of digits
 * from 0 to 9;
 * 
 * An integer with at least one digit in a base from 2 to 16 (inclusive),
 * enclosed between # characters, and preceded by the base, which can only
 * be a number between 2 and 16 in the first representation. For digits
 * from 10 to 15 characters a, b, ..., f and A, B, ..., F are used.
 * Additionally, both representations may contain underscore (_) characters;
 * they are used only as separators for improving legibility of numbers
 * and can be ignored while processing a number.
 * 
 * Your task is to determine whether the given string is a valid integer 
 * representation.
 * 
 * Note: this is how integer numbers are represented in the programming
 * language Ada.
 * 
 * Example
 * 
 * For line = "123_456_789", the output should be
 * adaNumber(line) = true;
 * For line = "16#123abc#", the output should be
 * adaNumber(line) = true;
 * For line = "10#123abc#", the output should be
 * adaNumber(line) = false;
 * For line = "10#10#123ABC#", the output should be
 * adaNumber(line) = false;
 * For line = "10#0#", the output should be
 * adaNumber(line) = true;
 * For line = "10##", the output should be
 * adaNumber(line) = false.
 */
adaNumber = l => {
    // remove all '_' chars from input
	let lArr = l.split('_').join('').split('#');
    
    // quit if invalid # of '#' chars
    if (![1,3].includes(lArr.length)) return false;
    
    let [a,b,c] = lArr; // convert arr to individual variables
    
    // handle empty string / '_' cases
    if (!a) return false;

    // if 1 num only, make sure it's base 10
    if (b == undefined) return !a.match(/[^0-9]/);
    
    else {
        // in case there's letters in the first num (not necessary)
        if (isNaN(+a)) return false;
            
        // handle empty 2nd val
        if (b == '') return false;
        
        // handle bases in 3rd position (not necessary)
        if (c !== '') {
            let cArr = c.split('e+');
            if (cArr[0] == '' && cArr[1] && cArr.length > 0)
                return !cArr[1].match(/[^0-9]/)
            else return false
        }
        
        a = +a; // convert string to number
        
        // b can only contain digits < a
        if (a > 1 && a < 11)
            return !b.match( RegExp(`[^0-${a-1}]`) )
        
        // b can only contain characters in base set
        else if (a > 10 && a < 17) {
            let chars = 'ABCDEF';
            let i = a % 10;
            return !b.toUpperCase().match(
                RegExp(`[^A-${chars[i-1]}0-9]`)
            )
        }
        
        // invalid a number
        else return false;
    }
}
