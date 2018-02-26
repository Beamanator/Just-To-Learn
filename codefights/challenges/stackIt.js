// Name: stackIt
// URL: https://codefights.com/challenge/qTHXJTeYezBvkHSoR
function stackIt(packs) {
    let t = 0;
    
    for (let i = 0; t < packs; i++) {
        t += i;
    }
    
    return t == packs;
}
