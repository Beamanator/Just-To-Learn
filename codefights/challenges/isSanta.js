/**
 * Name: Is Santa?
 * Date: 26 Dec 2018
 * Type: Reverse Challenge
 */

// set some globals
Y = 'It is Santa! Merry Christmas and a Happy New Year!'
N = 'Hey, someone! Merry Christmas and have a nice day!'
// if there's 3 "ho"s in a row, anywhere, case insensitive, it's santa!
isSanta = S => RegExp(/(ho){3}/gi).test(S) ? Y : N
