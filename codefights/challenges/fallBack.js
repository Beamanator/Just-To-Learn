/**
 * Name: Fall Back
 * Difficulty: 1000 (reverse challenge)
 * Date: 5 Nov 2018
 */
// 109 chars
fallBack = t =>
    t.replace(
        /([0-9]{1,2}):([0-9]{2})(A|P)/,
        (_,b,c,d) => `${b > 1 ? b - 1 : 12}:${c}${b > 11 ? d == 'A' ? 'P' : 'A' : d}`
    )
