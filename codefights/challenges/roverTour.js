/**
 * Name: Rover Tour
 * Link: https://codefights.com/challenge/4oRAnJXGqnL9K7Rdf
 * Short Desc:
 * Given an array terrainDifficulty, representing the energy cost for
 * each kilometre of the trip, you'd like to find the longest strip
 * of land you can travel across with your current energy. Return
 * the length of this trip (in kilometres).
 */
roverTour = (t, e) =>
    t.reduce((A, E, I, Z) => {
        // check if current trip allows 1 more km
        let T = A.r + E
        
        // if trip is too long, subtract previous trips until
        // we have enough energy for current trip
        while (T > e) {
            // first, remove first trip
            T -= Z[A.f];
            // next, increment first index
            A.f++;
            A.l--;
        }
        
        A.r = T; A.l++;
        if (A.l > A.m) A.m = A.l;
        
        return A;
    },
    // m = max km, f = first index,
    // r = running total, l = current km length
    {m: 0, f: 0, r: 0, l: 0})

    // get the max prop, which is the longest trip possible
    .m