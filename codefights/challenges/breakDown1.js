// Name: breakDown1
// URL: https://codefights.com/challenge/u9YFDa2WYbbCqWSzv
function breakDown1(a) {
    let d = [];
    for (let i = 0; i < 3; i++) {
        let z = [a[i]], u = Math.floor( a[i]/2 );
        for (let j = u; j > 1; j--) {
            if (a[i] % j === 0) {
                z.push(j);
            }
        }
        d.push(z);
    }
    
    for (let i = 0; i < 2; i++) {
        for (let j = i+1; j < 3; j++) {
            let f = d[i], l = d[j];
            
            for (let z = 0; z < f.length; z++) {
                if (l.includes(f[z]))
                    return false;
            }
        }
    }
    return true;
}
