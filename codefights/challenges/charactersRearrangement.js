// Name: charactersRearrangement
// URL: https://codefights.com/challenge/d3pnAhF9bdoT4pmsC
function charactersRearrangement(string1, string2) {
    if (string1.length !== string2.length)
        return false;
    
    let tot1 = tot(string1),
        tot2 = tot(string2);

    if (tot1.length !== tot2.length)
        return false;
    
    for (let i = 0; i < tot1.length; i++) {
        if (tot1[i] !== tot2[i])
            return false;
    }
    return true;
}

function tot(s) {
    let r = [];
    for (let c of s) {
        let i = c.charCodeAt(0)-97;
        r[i] = r[i] ? r[i]+1 : 1;
    }
    return r;
}
