// Name: texting
// URL: https://codefights.com/challenge/dNKLPGwENpZPYbvDp
function texting(s) {
    let map = {
        ' ': '01',
        'a': '21',
        'b': '22',
        'c': '23',
        'd': '31',
        'e': '32',
        'f': '33',
        'g': '41',
        'h': '42',
        'i': '43',
        'j': '51',
        'k': '52',
        'l': '53',
        'm': '61',
        'n': '62',
        'o': '63',
        'p': '71', 
        'q': '72',
        'r': '73',
        's': '74',
        't': '81',
        'u': '82',
        'v': '83',
        'w': '91',
        'x': '92',
        'y': '93',
        'z': '94'
    };
    var m = '', p, c = 1, pz;
    for (let i = 0; i < s.length; i++) {
        let l = s[i];
        
        if (l === p) {
            c++;
            if (c > 2) {
                let z = ('' + c).length,
                    o = (z > pz && (c % 10) === 0) ? 1 : 0;
                pz = z;
                
                m = m.substr(0, m.length-(2 + z - o));
            } else {
                m = m.substr(0, m.length-2);
            }
        }
        else {
            c = 1;
        }
        m += ( c > 1 ? c : '' ) + map[l];
        p = l;
    }
    return m;
}
