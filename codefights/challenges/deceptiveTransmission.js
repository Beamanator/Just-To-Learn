// Name: deceptiveTransmission
function deceptiveTransmission(m) {
    let o = '';
    for (let i = 0; i < m.length; i += 10) {
        let subM = m.substr(i, 10), secChar = '';
        for (let j = 0; j < subM.length; j += 2) {
            if (subM[j].charCodeAt(0) === 8234)
                secChar += '0';
            else
                secChar += '1';
        }
        let d = String.fromCharCode(parseInt(secChar, 2) + 65);
        if (d === '[')
            o += ' ';
        else
            o += d;
    }
    return o.trim();
}
