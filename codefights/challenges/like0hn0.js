/**
 * Name: like0hn0
 * Date: 24 Apr 2018
 * 
 * http://0hn0.com/
 * 
 * Given a square matrix grid, return whether it is a valid
 * solution to a game of 0h n0.
 * 
 * This is based on the game 0h n0, by Martin Kool, that has the
 * following rules:
 * 
 * Let's define a visibility of the cell as the number of cells
 * till first 0 or the border of the grid in all 4 directions;
 * The grid is a solution to a game if for each cell containing
 * number x > 0, its visibility is equal to x.
 * Given the grid, return whether it is the solution to the game
 * or not.
 * 
 * Example
 * For
 * 
 * grid = [[1, 2, 0],
 *         [0, 1, 0],
 *         [0, 0, 0]]
 * the output should be
 * like0hn0(grid) = true.
 * Let's look at all non-zero cells:
 * [diagram online]
 * 
 * Cell grid[0][0] contains number 1 and has visibility equal to 1
 * (only grid[0][1] is visible from this cell)
 * Cell grid[0][1] contains number 2 and has visibility equal to 2
 * (grid[0][0] and grid[1][1] are visible from this cell)
 * Cell grid[1][1] contains number 1 and has visibility equal to 1
 * (only grid[0][1] is visible from this cell)
 */
check = (g, i, j, di, dj) => {
    let c = 0;
    while (g[ i + di ] && g[ i + di ][ j + dj ]) {
        // increment count
        c++;
        // move to next cell
        i += di; j += dj;
    }
    return c;
}
function like0hn0(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            // get number at this position
            let n = grid[i][j];
            
            // skip if value is 0, we don't care
            if (n == 0) continue;
            
            let count = 0;
            
            count += check( grid, i, j,  1, 0 );
            count += check( grid, i, j, -1, 0 );
            count += check( grid, i, j, 0,  1 );
            count += check( grid, i, j, 0, -1 );
            
            if (n !== count) return false;
        }
    }
    
    return true;
}
