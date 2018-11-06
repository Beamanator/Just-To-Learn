/**
 * Name: Blur Faces
 * Difficulty: Medium (10 min)
 * Time: 20 (I second-guessed my original logic... oops)
 */
isArr = a => Array.isArray(a)
isNum = n => Number.isInteger(n)

function blurFaces(img) {
    let blurImg = [];
    
    for (let r = 0; r < img.length; r++) {
        let blurRow = [];
        
        for (let c = 0; c < img[0].length; c++) {
            let sum = 0, count = 0;
            
            if (isArr(img[r-1]) && isNum(img[r-1][c-1])) {sum += img[r-1][c-1]; count++;}
            if (isArr(img[r-1]) && isNum(img[r-1][ c ])) {sum += img[r-1][ c ]; count++;}
            if (isArr(img[r-1]) && isNum(img[r-1][c+1])) {sum += img[r-1][c+1]; count++;}
            
            if (isArr(img[r]) && isNum(img[r][c-1])) {sum += img[r][c-1]; count++;}
            if (isArr(img[r]) && isNum(img[r][c+1])) {sum += img[r][c+1]; count++;}
            
            if (isArr(img[r+1]) && isNum(img[r+1][c-1])) {sum += img[r+1][c-1]; count++;}
            if (isArr(img[r+1]) && isNum(img[r+1][ c ])) {sum += img[r+1][ c ]; count++;}
            if (isArr(img[r+1]) && isNum(img[r+1][c+1])) {sum += img[r+1][c+1]; count++;}
            
            // calculate average
            blurRow.push(sum / count);
        }
        
        blurImg.push(blurRow);
    }
    
    return blurImg;
}
