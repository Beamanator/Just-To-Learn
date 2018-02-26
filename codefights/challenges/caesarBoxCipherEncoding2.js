// Name: caesarBoxCipherEncoding2
// URL: https://codefights.com/challenge/qx8d8fsxGZsRZopYJ
caesarBoxCipherEncoding2 = m => {
    let t = 0;
    for (let n = 2, l = m.length; n <= l/2; n++) {
        if (!(l % n)) {if (m === e(n, e(n, m))) t++;}
    }
    return t;
}

e = (n, g) => {
    let w = [],o=u=0;
    
    for (let i = 0; i < g.length; i++) {
        let z = n * u + o;
        if (z >= g.length) {
            o++;
            u = 0;
            z = n * u + o;
            u++;
        }
        else  u++;
        
        w[i] = g[z];
    }
    
    return w.join('');
}
