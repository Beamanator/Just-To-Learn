// Name: rand.js
// URL: https://codefights.com/challenge/SWd48nKCyteLjfHxg
function rand(entropy) {
    let r = entropy.split('[')[0],
        f = +r.split(',')[0],
        t = +r.split(',')[1];
    
    let o = entropy.split('[')[1],
        a = o.split(']')[0].split(',');
    
    let p = [];
    
    for (let i = +f; i <= +t; i++) {
        if (!a.includes(''+i))
            p.push(i);
    }
    
    if (p.length % 2 === 1)
        return p[p.length/2 - 0.5];
    else {
        return p[p.length/2 - Math.round(Math.random())];
    }
}
