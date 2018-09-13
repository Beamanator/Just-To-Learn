/**
 * Name: Production Series INfo
 * Date: 13 Sept 2018
 * Num characters: 210
 */
z = 'ngredients'
productionSeriesInfo = (i, r1, r2, s) =>
    (T=s.reduce((t,v) =>
        t + (v == 1 ? r1 : v == 2 ? r2 : v),
    0)) == i
        ? ["Ok"]
        : i < T
            ? [`Out of i${z}!`, `Missing ${T - i} i` + z]
            : ["Ok", (R=~~(i/T)-1) > 0 ? `I${z} for ${R} more series` : '']
            .filter(e => e !== '')