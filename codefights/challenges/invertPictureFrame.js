// Name: invertPictureFrame
// URL: https://codefights.com/challenge/E7sEeEx6G7aBXA7fG
function invertPictureFrame(x) {
    let out = [];
    
    let line1 = [];
    let lineN = [];
    for (let i = 0; i < x; i++) {
        line1.push( (i*x) + 1 );
        lineN.push( (i+1) * x );
    }
    
    out.push(line1);
    
    if (x === 1)
        return out;
    else if (x === 2) {
        out.push(lineN);
        return out;
    }
    else {
        for (let i = 2; i < x; i++) {
            let row = [i];
            for (let j = 1; j <= x-2; j++) {
                let next = (i-1) * x + 1 + j;
                row.push(next);
            }
            row.push(i + (x * (x-1)));
            out.push(row);
        }
        
        out.push(lineN);
        return out;
    }
}
