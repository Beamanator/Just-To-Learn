// Name: measureHuevos
// URL: https://codefights.com/challenge/yCdzcnbxdRKxyxMwg
function measureHuevos(g, ct) {
    m = {
        'g': 144,
        'hd': 6,
        'd': 12,
        'bd': 13
    };
    d = m[ct];
    
    z = ['nope', 'p', 's', 'm', 'l', 'xl', 'j'];
    w = [0, 35.4, 42.5, 49.6, 56.7, 63.8, 70.9]
    
    for (i in w)
        if (g/d >= w[i])
            f = z[i];
    return f;
    
}
