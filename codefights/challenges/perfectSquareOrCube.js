/**
 * Name: Perfect Square or Cube
 * 
 * It's your lucky day: you just landed a role on the hit TV show "The
 * Walking Dead"!
 * 
 * In your first episode, the scene is pretty stressful already: you've
 * found a serum that will make you immune to zombies, but it's inside a
 * locked safe (and the zombies are scratching outside the door!). First
 * you try to shoot out the lock mechanism with your gun, to no avail.
 * Suddenly you notice a message scrawled on the side of the safe: "the
 * password is a perfect square or a perfect cube". There is also a number
 * on this note.
 * 
 * Determine the number of ways you can rearrange the digits of the number
 * to make a correct password. If the given number is already a perfect
 * square or a perfect cube, include it in your answer as well. In your
 * answer, also include correct passwords with leading zeroes.
 * 
 * Example
 * 
 * For number = 414, the output should be
 * perfectSquareOrCube(number) = 2.
 * You can get numbers 144, which is a perfect square of 12, and 441,
 * which is a perfect square of 21.
 * 
 * For number = 64, the output should be
 * perfectSquareOrCube(number) = 1.
 * The number 64 is a perfect square of 8 and a perfect cube of 4.
 * 
 * For number = 71, the output should be
 * perfectSquareOrCube(number) = 0.
 * 71 and 17 aren't perfect squares or perfect cubes.
 */
// rounding function
r = (n, l) =>
    Math.round(n * Math.pow(10, l)) / Math.pow(10, l)

// cubic
c = n => (r(n**(1/3), 3) % 1) == 0 ? 1 : 0

// perfect-finder function
p = n => c(n) || (r(n**.5, 3) % 1) == 0 ? 1 : 0

// remove dupes + add perfect #s
a = l =>
    // remove duplicates
    l.reduce((t, e) =>
        !t.includes(e) ? t.concat(e) : t, [])
    // total up perfect #s
    .reduce((t, e) =>
        t + p(+e), 0)

// main function -> 
perfectSquareOrCube = n =>
    (n += '') < 10 ?
        p(+n) :
    n < 100 ?
        a([ +n, +(n[1] + n[0]) ]) :
    a([
        +n,                    +(n[0] + n[2] + n[1]),
        +(n[1] + n[0] + n[2]), +(n[1] + n[2] + n[0]),
        +(n[2] + n[0] + n[1]), +(n[2] + n[1] + n[0])
    ])