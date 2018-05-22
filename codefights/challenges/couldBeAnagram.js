/**
 * Name: Could Be Anagram
 * Two strings are called anagrams, if they contain the same characters, but
 * the order of the characters may be different.
 * 
 * Given a string consisting of lowercase letters and question marks, s1,
 * and another string consisting of lowercase letters, s2, determine whether
 * these two strings could become anagrams by replacing each ? character in
 * s1 with a letter.
 * 
 * Examples
 * 
 * For s1 = listen and s2 = silent, the output should be couldBeAnagram(s1, s2) =
 * true. The letters of s1 could be rearranged to form s2.
 * 
 * For s1 = cat and s2 = dog, the output should be couldBeAnagram(s1, s2) =
 * false. There's no way s2 could be formed using the letters of s1.
 * 
 * For s1 = n?ce and s2 = nice, the output should be couldBeAnagram(s1, s2) =
 * true. By replacing the ? with i in s1, the two strings will have the same characters.
 */
// extract split function - split string by character
S = (s, c='') => s.split(c)

// compare character collections, return # differences
P = (a, b) => {
    let M = 0 // mismatch
    Object.keys(b).forEach(c => {
        let D = b[c] - ~~a[c] // ~~ to handle undefined
        M += D > 0 ? D : 0
    })
    return M
}

// count # of characters in each string, return collection obj
C = s =>
    s.reduce((a, e) => {
        a[e] ? a[e]++ : a[e] = 1
        return a
    }, {})

// main
couldBeAnagram = (a, b) =>
    P(
        C( S( S(a, '?').join`` ) ),
        C( S(b) )
    ) - S(a, '?').length + 1 == 0

