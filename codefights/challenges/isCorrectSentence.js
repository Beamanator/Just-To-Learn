/**
 * Name: is correct sentence
 * Date: 7 July 2019
 * Difficulty: 2000
 */
// v1: 52 chars
// isCorrectSentence = s => /^[A-Z]/.test(s) && /\.$/.test(s)

// v2: 42 chars
isCorrectSentence = (s) => /^[A-Z].*\.$/.test(s);

// minimum may be 40 somehow?
