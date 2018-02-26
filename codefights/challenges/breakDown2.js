// Name: breakDown2
function breakDown2(a) {
    // NOTE: 1) each delim may be different??
    // 2) delims can contain characters - in this code, numbers must be within other characters (#3$, not 3$3)
    let delim1 = getDelim(a[0]),
        delim2 = getDelim(a[1]),
        delim3 = getDelim(a[2]);
    
    let a1 = a[0].split(delim1),
        a2 = a[1].split(delim2),
        a3 = a[2].split(delim3);
    
    let c1 = +a1[0], c2 = +a2[0], c3 = +a3[0];
    let b1 = +a1[1], b2 = +a2[1], b3 = +a3[1],
        B = b1 * b2 * b3;
    
    return [c1, c2, c3, B, b2*b3, b1*b3, b1*b2]
}


getDelim = s => {
    let o = '', nums = ['0','1','2','3','4','5','6','7','8','9'];
    let iStart = 0, iEnd = s.length;
    for (let i = 0; i < s.length; i++) {
        if (!nums.includes(s[i])) {
            iStart = i;
            break;
        }
    }
    for (let i = s.length-1; i >= 0; i--) {
        if (!nums.includes(s[i])) {
            iEnd = i;
            break;
        }
    }
    o = s.substr(iStart, (iEnd - iStart + 1));
    return o;
}