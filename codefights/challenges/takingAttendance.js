/**
 * Name: Taking Attendance
 * Date: 27 Sept 2018
 * Note: Maybe could use regex here instead, but i thought of that
 * after finishing the challenge
 */
// 162 chars:
// running total
r = 0
// map running total to time count
m = n => !n ? 0 : 2 ** (n-1)
// vowels
v = 'aeiouyAEIOUY'
// main
takingAttendance = l =>
    l.reduce(
        (t, n) => {
            // initial 5 seconds (for students to respond)
            t += 5
            
            n.split``.forEach(c => {
                // check if consonant
                if (v.indexOf(c) < 0) {
                    r++
                } else {
                    // add current count
                    t += m(r)
                    r = 0
                }
            })
            // add final count (in case last letter is consonant)
            t += m(r)
            r = 0
            // return final
            return t
        }, 0
    )