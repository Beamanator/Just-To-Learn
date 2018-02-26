// Name: inverseCaptcha
// URL: https://codefights.com/challenge/RCxi4uNooRPdzcaS5
function inverseCaptcha(a) {
    let t = 0;
    a += '';
    
    for (let i = 0; i < a.length; i++) {
        if ((a[i+1] && a[i+1] == a[i]) ||
           (!a[i+1] && a[i] == a[0])) {
            t += +a[i];
        }
    }
    
    return t;
}
