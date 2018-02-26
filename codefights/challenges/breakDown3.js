// Name: breakDown3
function breakDown3(s) {
    let z = s.split('='),
        B = +z[0].substr(0, z[0].length - 1),
        m = +z[1].substr(0, z[1].indexOf('(') ),
        r = z[1].split(' ')[1],
        b = +r.substr(0, r.length - 1);
    
    // get minimum B
    while (B-b > 0) B -= b;
    
    // get m which is evenly divisible by B
    while (m % B !== 0) m += b;
    
    return m/B;
}
