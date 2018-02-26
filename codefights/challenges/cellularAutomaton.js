// Name: cellularAutomaton
// URL: https://codefights.com/challenge/wwiKS64bNrqvLp4EJ
function cellularAutomaton(rule, initialRow, iterations) {
    let binary = getBinFromRule(rule),
        row = initialRow;
    
    for (let i = 0; i < iterations; i++) {
        row = nextLife(row, binary);
    }
 
    return row;
}

function nextLife(row, binary) {
    let newRow = '';
    
    // loop through row, getting groups of 3 cells
    for (let i = 0; i < row.length; i++) {
        let tri = '';
        
        if (i === 0) {
            // get last cell, wrapped around
            tri += row[row.length-1];
        } else {
            tri += row[i-1];
        }
        
        tri += row[i];
        
        if (i === row.length-1) {
            tri += row[0];
        } else {
            tri += row[i+1];
        }
        
        if (getAlive(tri, binary))
            newRow += '#';
        else
            newRow += '.';
    }
    
    return newRow;
}

function getAlive(tri, binary) {
    let index = '';
    
    switch(tri) {
        case '###': // 7
            index = 0;
            break;
        
        case '##.': // 6
            index = 1;
            break;
            
        case '#.#': // 5
            index = 2;
            break;
            
        case '#..': // 4
            index = 3;
            break;
            
        case '.##': // 3
            index = 4;
            break;
            
        case '.#.': // 2
            index = 5;
            break;
            
        case '..#': // 1
            index = 6;
            break;
            
        case '...': // 0
            index = 7;
            break;
    }
    
    if (binary[index] === '1')
        return true;
    else
        return false;
}

function getBinFromRule(rule) {
    let bin = '';
    
    for (let i = 7; i >= 0; i--) {
        if (rule >= 2**i) {
            rule -= 2**i;
            bin += 1;
        } else {
            bin += 0;
        }
    }
    
    return bin;
}