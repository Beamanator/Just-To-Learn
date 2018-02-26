// Name: calculateNetworkAddress
// URL: https://codefights.com/challenge/uivqcSYP9zHXXrNWz
function calculateNetworkAddress(cidr) {
    var L = parseInt( cidr.split('/')[1] );
    
    var ls = new Array(L).fill('1'),
        os = new Array(32 - L).fill('0');
    var m = ls.concat(os).join('');
    
    var a = cidr.split('.');
    return [
        b(z(c(a[0]),m.slice(0,8))),
        b(z(c(a[1]),m.slice(8,16))),
        b(z(c(a[2]),m.slice(16,24))),
        b(z(c(a[3]),m.slice(24,32)))
        ].join('.');
}

function z(a,b) {
    var k='';
    for (let i = 0; i < 8; i++) {
        if (a[i] !== '1' || b[i] !== '1')
            k += '0';
        else
            k += '1';
    }
    return k;
}

function c(n) {
    n = parseInt(n);
    let o = '';
    for (let i = 7; i >= 0; i--) {
        let p = Math.pow(2, i);
        if (p <= n) {
            n -= p;
            o += '1';
        }
        
        else
            o += '0';
    }
    return o;
}

function b(n) {
    let t = 0;
    for (let i = 0; i < 8; i++) {
        if (n[7 - i] === '1')
            t += Math.pow(2, i);
    }
    return t;
}