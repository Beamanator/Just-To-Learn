/**
 * Name: Is Sentence Correct?
 * Difficulty: Easy (10:00)
 * Time: 3:28
 * Note: can only edit regexp in this problem
 */
function isSentenceCorrect(sentence) {
    var re = /^[A-Z][^\.\?!]*[\.\?!]$/ ;
    return re.test(sentence);
}
  