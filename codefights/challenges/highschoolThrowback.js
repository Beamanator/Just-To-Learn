// Name: highschoolThrowback
// URL: https://codefights.com/challenge/i4TuixjTHTDTFZ3nZ
function highschoolThrowback (c) {
    let s = Math.sqrt(-4*c[0]*c[2] + c[1]**2),
        a = (-c[1]+s)/(2*c[0]),
        b = (-c[1]-s)/(2*c[0]),
        z = [Math.round(a*100)/100, Math.round(b*100)/100];
    
    if (z[0] == z[1])
        return [z[0]];
    else
        return z.sort((a,b) => a-b);
    
}
