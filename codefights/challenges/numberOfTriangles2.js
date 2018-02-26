// Name: numberOfTriangles2
// URL: https://codefights.com/challenge/xQgo34A4XR2qAqPEM
function numberOfTriangles2(s) {
    let t = 0;
    for (let a = 0; a < s.length - 2; a++) {
        let A = s[a];
        for (let b = a + 1; b < s.length - 1; b++) {
            let B = s[b];
            for (let c = b + 1; c < s.length; c++) {
                let C = s[c];
                if (A+B>C && A+C>B && B+C>A)
                    t++;
            }
        }
    }
    return t;
}
