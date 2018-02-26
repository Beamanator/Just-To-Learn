// Name: lazyFriends
// URL: https://codefights.com/challenge/dXZBrfLtuSQhSB8Xf
lazyFriends = (h, d) => {
    o = [];
    for (i = 0; i < h.length; i++) {
        x = h[i];
        
        o[i] = 0;
        
        for (j = 0; j < h.length; j++) {
            if (i == j) continue;
            
            y = h[j];
            if (j < i && x - y <= d)
                o[i]++;
            if (j > i && y - x <= d)
                o[i]++;
        }
    }
    return o;
}