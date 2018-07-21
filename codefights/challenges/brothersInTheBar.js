/**
 * Name: Brothers In The Bar
 * Date: 21 July 2018
 */
// 148 chars
brothersInTheBar = g => {
    let t = 0, l, c = 0
    for (i = 0; i < g.length; i++) {
        s = g[i]
        if (!l) {
            l = s
            c = 1
        } else if (s == l) {
            c++;
            // handle t, index change, and g splice
            if (c == 3) {
                g.splice(i-2, 3)
                i -= 5
                t++
            }
        } else {
            l = s
            c = 1
        }
    }
    return t
}

// original, not slim - 288 chars:
function brothersInTheBar(glasses) {
    let tot = 0, last = undefined, consecutive = 0;
    for (let i = 0; i < glasses.length; i++) {
        let size = glasses[i];
        if (!last) {
            last = size;
            consecutive = 1;
        } else if (size == last) {
            consecutive++;
            // handle tot, index changing, and glasses splice
            if (consecutive == 3) {
                glasses.splice(i-2, 3);
                i -= 5;
                tot++;
            }
        } else {
            last = size;
            consecutive = 1;
        }
    }
    return tot;
}
