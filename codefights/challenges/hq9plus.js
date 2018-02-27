// Name: hq9plus
/**
 * HQ9+ is a joke programming language with four instructions:

H: Print "hello, world"
Q: Print the program's source code
9: Print the lyrics to "99 Bottles of Beer" (See Test 3)
+: Increment the accumulator (What does this do, anyway?)
Any other characters are not valid instructions and will be ignored.

While the language is pretty useless, it can be useful to try to implement it, since doing so means you know how to do all of the above.

Good luck!

Example
For program = "H", the output should be
hq9plus(program) = "hello, world".

Input/Output

[execution time limit] 4 seconds (js)

[input] string program

The HQ9+ program.

Guaranteed constraints:
1 ≤ program.length < 15.

[output] string

The output when running the HQ9+ program.
 */
hq9plus = p => {
    let out = '';
    for (let char of p) {
        switch(char) {
            case 'H':
                // print "hello, world"
                out += 'hello, world';
                break;
            
            case 'Q':
                // print source code
                out += p;
                break;
            
            case '9':
                // print 99 bottles of beer on the wall (song)
                out += b9();
                break;
                
            case '+':
                // do nothing?
                break;
        }
    }
    return out;
}
                
b9 = () => {
    let song = '';
    for (let i = 99; i > 0; i--) {
        let o = 'of beer', w = 'on the wall';
        let b = i == 1 ? 'bottle' : 'bottles';
        let b1 = i == 2 ? 'bottle' : 'bottles';
        let empty = '\n';
        
        song += `${i} ${b} ${o} ${w},
${i} ${b} ${o}.
`;
        // once i reaches 1, change things up
        song += i > 1 ? `Take one down, pass it around,
${i-1} ${b1} ${o} ${w}.

` : `Go to the store and buy some more,
99 ${b1} ${o} ${w}.`;
    }
    return song;
}
