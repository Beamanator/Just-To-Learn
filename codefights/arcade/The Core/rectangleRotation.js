/**
 * Name: Rectangle Rotation
 * Core Arcade #: 49
 * Description:
 * A rectangle with sides equal to even integers a and b is drawn on
 * the Cartesian plane. Its center (the intersection point of its
 * diagonals) coincides with the point (0, 0), but the sides of the
 * rectangle are not parallel to the axes; instead, they are forming
 * 45 degree angles with the axes.
 * 
 * How many points with integer coordinates are located inside the
 * given rectangle (including on its sides)?
 * 
 * Example
 * 
 * For a = 6 and b = 4, the output should be
 * rectangleRotation(a, b) = 23.
 * 
 * The following picture illustrates the example, and the 23 points
 * are marked green.
 */
getSides = a => {
    let A = ~~(a / Math.sqrt(2));
    
    return A % 2 == 1 ? [A + 1, A] : [A, A + 1];
}

rectangleRotation = (a, b) => {
    let A = getSides(a),
        B = getSides(b);
    
    return (A[0] * B[0]) + (A[1] * B[1]);
}
