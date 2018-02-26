// Name: mapMe
// URL: https://codefights.com/challenge/HHh4svEBh2XdyerJx
function mapMe(s) {
    let h = [];
    
    for (let c of s) {
        // get charCode
        let i = c.charCodeAt(0)%32;
        if (h[i])
            h[i].push(c);
        else
            h[i] = [c];
    }
    
    let m = '[';
    for (let i = 0; i < h.length; i++) {
        if (h[i] === undefined) continue;
        m += i + `:[${h[i].join(',')}],`;
    }
    m = m.substr(0, m.length-1) + ']';

    return m;
}
