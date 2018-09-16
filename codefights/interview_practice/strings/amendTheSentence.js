/**
 * Description: You have been given a string s, which is supposed to
 * be a sentence. However, someone forgot to put spaces between the
 * different words, and for some reason they capitalized the first
 * letter of every word. Return the sentence after making the following
 * amendments:
 * 
 * - Put a single space between the words.
 * - Convert the uppercase letters to lowercase.
 */
// old solution:
// function amendTheSentence(s) {
//     let newString = '';
//     for (let char of s) {
//         if (char.charCodeAt(0) <= 90)
//             newString += ' ' + char;
//         else
//             newString += char
//     }
//     return newString.trim().toLowerCase();
// }

// new soln (ES6):
amendTheSentence = s =>
    // split string into char array
    s.split``
    // on each character, add space if uppercase
    .map(char => char.charCodeAt(0) <= 90 ? ' ' + char : char)
    // join array back together into 1 array
    .join``
    // remove potential initial space + lowercase all letters
    .trim().toLowerCase()