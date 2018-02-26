// Name: longMultiplication
// URL: https://codefights.com/challenge/kmRFJGXfqpXeF2RLh
function longMultiplication(a, b) {
    let s = [],
        Z = 0;
    
    for (let i = b.length-1; i >= 0; i--) {
        let t = '',
            u = b.length - 1 - i,
            p = 0;
        
        if (u > 0)
            t = (new Array(u)).fill(0).join('');
        
        for (let j = 0; j < a.length; j++) {
            
            let m = (+b[i] * +a[a.length-1-j]) + p;
            
            if (m > 9)
                Z++;
            
            p = Math.floor(m/10);
            
            if (j == a.length-1) {
                t = m + t;
            } else {
                t = m % 10 + t;
            }
        }
        
        s.push(t);
    }
    
    let l = s[s.length-1].length,
        u = new Array(l).fill(0);
    
    for (let i = s.length - 1; i >= 0 ; i--) {
        let w = i,
            x = l - s[i].length;
        
        for (let j = 0; j < s[w].length; j++) {
            u[j + x] += (+s[w][j]);
        }
    }
    
    for (let i = u.length - 1; i >= 0; i--) {
        let r = Math.floor(u[i]/10);
        
        if (r > 0) {
            Z++;
            
            let c = '' + r;
            
            for (let j = 0; j < c.length; j++) {
                let o = j + 1,
                    v = c[c.length - 1 - j];
                
                if (u[i - o])
                    u[i - o] += +v;
            }
        }
    }
    
    return Z;
}
