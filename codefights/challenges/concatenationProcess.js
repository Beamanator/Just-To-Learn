// name: concatenationProcess
// URL: https://codefights.com/challenge/D3fJjTWxGu3ALNYXm
l = (i, d) => {
    let x=0,m;
    for (let j=0; j<i.length; j++) {
        if (!m || i[j].length < m.length) {
            x = j
            m = i[j]
        }
    }
    i.splice(x,1);
    return [m,i]
}
concatenationProcess = i => {
    while (i.length > 1) {
        let L, R
        
        [L, i] = l(i)
        [R, i] = getMinR(i)
        
        let c = L + R
        
        i.push(c)
    }
    
    return i[0]
}

function getMinR(init) {
    let minIndex = 0,
        min;
    
    for (let i = init.length-1; i >= 0; i--) {
        if (min === undefined || init[i].length < min.length) {
            minIndex = i;
            min = init[i];
        }
    }
    
    init.splice(minIndex, 1);
    
    return [min, init];
}