/**
 * Name: Different Squares:
 * Intro Arcade #: 55
 * 
 * Given a rectangular matrix containing only digits, calculate the
 * number of different 2 × 2 squares in it.
 * 
 * Example
 * 
 * For
 * 
 * matrix = [[1, 2, 1],
 *           [2, 2, 2],
 *           [2, 2, 2],
 *           [1, 2, 3],
 *           [2, 2, 1]]
 * 
 * the output should be
 * differentSquares(matrix) = 6.
 * 
 * Here are all 6 different 2 × 2 squares:
 * 
 * 1 2
 * 2 2
 * 
 * 2 1
 * 2 2
 * 
 * 2 2
 * 2 2
 * 
 * 2 2
 * 1 2
 * 
 * 2 2
 * 2 3
 * 
 * 2 3
 * 2 1
 * 
 * @param {any} matrix 
 * @returns 
 */
function differentSquares(matrix) {
    let uniqueSquares = [];
    
    // handle case of 1 row or 1 col
    if (matrix.length === 1 || matrix[0].length === 1)
        return 0;
    
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[0].length; j++) {
            let sq = [
                [matrix[i-1][j-1], matrix[ i ][j-1]],
                [matrix[i-1][ j ], matrix[ i ][ j ]]
            ];
            
            if (isNew(uniqueSquares, sq))
                uniqueSquares.push(sq);
        }
    }
    
    return uniqueSquares.length;
}

function isNew(uniqueSquares, newSquare) {
    for (let square of uniqueSquares) {
        if (square[0][0] === newSquare[0][0] &&
           square[0][1] === newSquare[0][1] &&
           square[1][0] === newSquare[1][0] &&
           square[1][1] === newSquare[1][1])
            return false;
    }
    
    return true;
}
