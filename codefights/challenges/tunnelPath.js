/**
 * Name: Tunnel Path
 * Description:
 * Uh oh! You've slept through your alarm and it looks like you'll be late for
 * your shift with the terraforming crew!
 * 
 * Fortunately, from your experience living on Mars, you've identified an
 * underground network of tunnels formed by lava tubes. It's risky, but if you
 * use the tunnels as a shortcut, it might just get you there on time.
 * 
 * All tunnels meet underground at a common point, and for each tunnel, we know
 * the coordinates of the entry point and the distance to this junction. For
 * example, we could represent the following map by tunnels = [[1, 2, 9],
 * [2, 7, 5], [8, 3, 4]]:
 * 
 * [tunnel network image online]
 * 
 * In this case, the underground distance from (1, 2) to (2, 7) would be
 * 9 + 5 = 14. The underground distance from (2, 7) to (8, 3) would be 5 + 4 = 9.
 * 
 * Given the startPoint (coordinates of where you live), the endPoint
 * (coordinates of your destination), and tunnels (a list of coordinates and
 * distances for each tunnel), find the shortest total distance you'll need to
 * travel. All above-ground travel is measured according to Manhattan distance.
 * 
 * Note: you can pass through the coordinates of a tunnel entrance without
 * entering the tunnel, and it's also possible that there's a tunnel entrance
 * at your start or end point.
 * 
 * Example
 * 
 * For startPoint = [7, 2], endPoint = [1, 8], and tunnels = [[1, 6, 2],
 * [7, 3, 8], [4, 1, 3]], the output should be tunnelPath(startPoint,
 * endPoint, tunnels) = 11.
 * 
 * [path example image online]
 * 
 * Although there's a tunnel entrance right next to your starting point (at
 * (7, 3)), it's a very long tunnel. It would be faster to take a detour and
 * go through the tunnel at (4, 1), emerging at (1, 6), for a total distance
 * of 4 + 3 + 2 + 2 = 11. Note that the above-ground distance would be 12,
 * so taking the tunnel would be shorter.
 */
// abstract out the Math.abs() function
A = (a, b) => Math.abs(a, b)

// abstract out the Math.min() function
N = (a, b) => Math.min(a, b);

// calculate manhattan distance between two coordinate pairs
M = (a, b) => A(a[0] - b[0]) + A(a[1] - b[1])

// main function
tunnelPath = (s, e, t) =>
    N(
        // straight-up manhattan dist between start & end
        m = M(s, e),
        
        // with tunnels
        t[0] ?
            // loop through tunnels, getting their manhattan distance from
            //  start and end points
            t.reduce((T, E) => {
                // for each tunnel [start, final, len], calc disc to
                // start (s) & end (s) + len of tunnel
                let S = M(E, s) + E[2],
                    F = M(E, e) + E[2];

                // if smallest dist from past distances, add to M (accuMulator).
                //  else return old minimum dist
                return [
                    T[0] == -1 ? S : N(T[0], S),
                    T[1] == -1 ? F : N(T[1], F)
                ];
            }, [-1, -1])
                // get final minimum length w/ all tunnels
                .reduce((T, E) => T + E, 0)
            : m
    )

