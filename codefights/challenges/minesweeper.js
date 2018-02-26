// Name: minesweeper
// URL: https://codefights.com/challenge/48o3YSHdmHtWRTxNT
function minesweeper(m) {
    let out = [];
    for (let r = 0; r < m.length; r++) {
        let row = m[r];
        let newR = [];
        for (let c = 0; c < row.length; c++) {
            let col = m[r][c];
            let n = 0;
            
            // check nearby cells
            n += a(m, r-1, c-1) ? 1 : 0;
            n += a(m, r-1,  c ) ? 1 : 0;
            n += a(m, r-1, c+1) ? 1 : 0;
            n += a(m,  r , c-1) ? 1 : 0;
            n += a(m,  r , c+1) ? 1 : 0;
            n += a(m, r+1, c-1) ? 1 : 0;
            n += a(m, r+1,  c ) ? 1 : 0;
            n += a(m, r+1, c+1) ? 1 : 0;
            
            newR.push(n);
        }
        out.push(newR);
    }
    return out;
}

function a(m,r,c) {
    return m[r] && m[r][c];
}