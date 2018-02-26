// Name: alphaChange
// URL: https://codefights.com/challenge/nvtxYJxqALFrPf3GF
function alphaChange(s) {
    var adder = "";
    var st = "", sc = '';
    var Uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var c = Uc.toLowerCase();
    for (var i = 0; i < s.length; i++) {
        var si = s[i].charCodeAt();
        if (si > 47 && si < 58) {
            adder += s[i];
        } else {
            st += s[i];
        }
    }
    
    adder = adder % 26;
    
    for (var i = 0; i < st.length; i++) {
        var code = st[i].charCodeAt();
        if (code > 90) {
            code -= 97;
            // lower case
            if (code + adder > 25) {
                sc += c.charAt(code + adder - 26);
                console.log('here?',st[i]);
            } else {
                sc += c.charAt(code + adder);
            }
        } else {
            code -= 65;
            // upper case
            if (code + adder > 25) {
                sc += Uc.charAt(code + adder - 26);
                console.log('HERE?',st[i]);
            } else {
                sc += Uc.charAt(code + adder);
            }
        }
    }
    
    return sc;
}
