// Name: secretArchivesLock
// URL: https://codefights.com/challenge/tuX9NefHfwnPBFZoW
function secretArchivesLock(lock, actions) {
    // Loop through set of actions:
    for (let i = 0; i < actions.length; i++) {
        // get next side of lock where magnet will be placed:
        var side = actions[i];
        
        // get magnet direction function:
        var magnetFn = getMagnetFunction( side );
        
        // manipulate lock using magnetFunction
        lock = magnetFn( lock );
    }
    
    return lock;
}

/**
 * Function takes a lock, moves all non-empty cells to the LEFT as if pulled by
 * a magnet, and returns the outcome.
 *
 * @returns {array} new lock orientation
 */
function magnetLeft( lock ) {
    var newLock = [];

    // Loop through each row of lock
    for (let i = 0; i < lock.length; i++) {
        // get current row
        var row = lock[i];
        
        // loop through row, get array (in order) of non-empty cells
        var nonEmptyCells = getNonemptyCells( row );
        
        // fill right side of array
        var newRow = nonEmptyCells;
        for (let j = 0; j < (row.length - nonEmptyCells.length); j++) {
            newRow += '.';
        } // newRow should now be the completed row
        
        // build new row array, add it into lock
        newLock.push(newRow);
    }
    
    return newLock;
}

/**
 * Function takes a lock, moves all non-empty cells to the RIGHT as if pulled by
 * a magnet, and returns the outcome. 
 *
 * @returns {array} new lock orientation
 */
function magnetRight( lock ) {
    var newLock = [];
    
    // Loop through each row of lock
    for (let i = 0; i < lock.length; i++) {
        // get current row
        var row = lock[i];
        
        // loop through row, get string (in order) of non-empty cells
        var nonEmptyCells = getNonemptyCells( row );
        
        // fill left side of array
        var newRow = '';
        for (let j = 0; j < (row.length - nonEmptyCells.length); j++) {
            newRow += '.';
        }
        newRow += nonEmptyCells; // newRow should now be the completed row
        
        // build new row array, add it into lock
        newLock.push(newRow);
    }
    
    return newLock;
}

/**
 * Function takes a lock, moves all non-empty cells DOWN as if pulled by
 * a magnet, and returns the outcome. 
 *
 * @returns {array} new lock orientation
 */
function magnetDown( lock ) {
    var newLock = [];
    var column1 = lock[0];
    
    // Loop through each 'column' of lock
    for (let i = 0; i < column1.length; i++) {
        var column = '';
        
        // First create column string
        for (let j = 0; j < lock.length; j++) {
            column += lock[j][i];
        } // now column #index j should be the top-to-bottom column
        
        // loop through column, get string (in order) of non-empty cells
        var nonEmptyCells = getNonemptyCells( column );
        
        // fill top side of string
        var newColumn = '';
        for (let j = 0; j < (column.length - nonEmptyCells.length); j++) {
            newColumn += '.';
        }
        newColumn += nonEmptyCells; // newColumn should now be the completed column
        
        // build new column of lock
        for (let j = 0; j < newColumn.length; j++) {
            if ( newLock[j] == undefined )
                newLock[j] = '';
            
            newLock[j] += newColumn[j];
        }
    }
    
    return newLock;
}

/**
 * Function takes a lock, moves all non-empty cells UP as if pulled by
 * a magnet, and returns the outcome. 
 *
 * @returns {array} new lock orientation
 */
function magnetUp( lock ) {
    var newLock = [];
    var column1 = lock[0];
    
    // Loop through each 'column' of lock
    for (let i = 0; i < column1.length; i++) {
        var column = '';
        
        // First create column string
        for (let j = 0; j < lock.length; j++) {
            column += lock[j][i];
        } // now column #index j should be the top-to-bottom column
        
        // loop through column, get string (in order) of non-empty cells
        var nonEmptyCells = getNonemptyCells( column );
        
        // fill bottom side of string
        var newColumn = nonEmptyCells;
        for (let j = 0; j < (column.length - nonEmptyCells.length); j++) {
            newColumn += '.';
        }
        
        // build new column of lock
        for (let j = 0; j < newColumn.length; j++) {
            if ( newLock[j] == undefined )
                newLock[j] = '';
            
            newLock[j] += newColumn[j];
        }
    }
    
    return newLock;
}

/**
 * Function returns a string of all non-empty cells from given row of cells
 * 
 * @param {array} row - string of cells to look through for non-empty cells
 * @returns string of non-empty letters found in 'row'
 */
function getNonemptyCells( row ) {
    var nonEmpty = '';
    
    // loop through row
    for (let i = 0; i < row.length; i++) {
        var item = row[i];
        
        // if item isn't "empty" ('.'), add to nonEmpty string
        if (item !== '.')
            nonEmpty += item;
    }
    
    return nonEmpty;
}

/**
 * Function returns function name that will manipulate the lock given a side of the lock
 * that the next magnet will be placed
 * 
 * @param {string} side - one letter code ('L', 'R', 'D', 'U') for which side the magnet is placed on
 * @returns {function} function - name of function to manipulate lock
 */
function getMagnetFunction( side ) {
    var magnetFunction;
    
    switch(side) {
        // Left
        case 'L':
            magnetFunction = magnetLeft;
            break;
            
        // Right
        case 'R':
            magnetFunction = magnetRight;
            break;
            
        // Down
        case 'D': 
            magnetFunction = magnetDown;
            break;
            
        // Up
        case 'U':
            magnetFunction = magnetUp;
            break;
            
        default: 
            // Shouldn't be used - or else, something is messed up!
            console.error('Something is very wrong.');
    }
    
    return magnetFunction;
}