// Name: MatrixPerimeter
// URL: https://codefights.com/challenge/J6xCK2vBHNn5LB4YM
function MatrixPerimeter(matrix) {
    var perim = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j]) {
                perim += (i == 0) ? 1 : 0; // for i = -1
                perim += (i == matrix.length - 1) ? 1 : 0; // for i = length
                perim += (i > 0 && !matrix[i-1][j]) ? 1 : 0;
                perim += (i < matrix.length - 1 && !matrix[i+1][j]) ? 1 : 0;
                
                perim += (j == 0) ? 1 : 0; // for j = -1
                perim += (j == matrix[0].length - 1) ? 1 : 0; // for j = length
                perim += (j > 0 && !matrix[i][j-1]) ? 1 : 0;
                perim += (j < matrix[0].length - 1 && !matrix[i][j+1]) ? 1 : 0;
            }
        }
    }
    return perim;
}
