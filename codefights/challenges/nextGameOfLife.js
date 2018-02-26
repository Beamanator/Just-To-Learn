// Name: nextGameOfLife
// URL: https://codefights.com/challenge/J9tdW6Fo7FiHmsqk4
function nextGameOfLife(seed) {
    var newLife = [];
    
    for (let i = 0; i < seed.length; i++) {
        for (let j = 0; j < seed[0].length; j++) {
            var neighbors = 0;
            var live = seed[i][j];
            var newCell;
            
            if (seed[ i ][j-1]) neighbors++;
            if (seed[ i ][j+1]) neighbors++;
            // if (seed[ i ][ j ]) neighbors++;
            
            if (seed[i-1] && seed[i-1][j-1]) neighbors++;
            if (seed[i-1] && seed[i-1][j+1]) neighbors++;
            if (seed[i-1] && seed[i-1][ j ]) neighbors++;
            
            if (seed[i+1] && seed[i+1][j-1]) neighbors++;
            if (seed[i+1] && seed[i+1][j+1]) neighbors++;
            if (seed[i+1] && seed[i+1][ j ]) neighbors++;
            
            if (live) {
                if (neighbors < 2)
                    newCell = 0;
                else if (neighbors === 2 || neighbors === 3)
                    newCell = 1;
                else
                    newCell = 0;
            }
            
            else {
                if (neighbors === 3)
                    newCell = 1;
                else
                    newCell = 0;
            }
            
            if (newLife[i] === undefined)
                newLife[i] = [newCell];
            else
                newLife[i].push(newCell);
        }
    }
    
    return newLife;
}
