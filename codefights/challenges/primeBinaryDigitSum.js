// Name: primeBinaryDigitSum
// URL: https://codefights.com/challenge/JpaX42MHerMYeTMjD
function primeBinaryDigitSum(rangeStart, rangeEnd, sum) {
    let o = [];
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
        if (p(i)) {
            let b = i.toString(2);
            
            if (a(b, sum))
                o.push(i);
        }
    }
    
    return o;
}


const a = (s, m) => {
    let t = 0;
    for (let i = 0; i < s.length; i++) {
        t += parseInt(s[i], 10);
    }
    return t === m;
}

const p = n => {
    for(let i = 2, s = Math.sqrt(n); i <= s; i++)
        if(n % i === 0) return false; 
    return n !== 1;
}