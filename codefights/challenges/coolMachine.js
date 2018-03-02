// Name: coolMachine
function coolMachine(tape, p, i=0, state='0') {
    let read = tape[i];
    
    // end state
    if (state == '9')
        return tape;
    
    // get correct cmd from program (p)
    let c;
    for (let cmd of p) {
        if (cmd[0] == state && cmd[2] == read) {
            c = cmd;
            break;
        }
    }
    
    // get needed vars from command
    let char, dir, next;
    [,,,,char,,dir,,next] = c;
    
    // overwrite char
    tape = tape.substr(0, i) + char + tape.substr(i+1);
    
    // move direction
    i = dir == 'R' ? ++i : --i;
    
    return coolMachine(tape, p, i, next);
}
