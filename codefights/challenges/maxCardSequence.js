/**
 * Name: Max Card Sequence
 * Rick decided to play cards. He had a set of n cards with numbers
 * a1, a2, ... an.
 * 
 * The card sequence is good if there are no 2 neighboring even
 * numbers, there are no 2 neighboring odd numbers. So, the sequence
 * of the numbers should be, for example, like this: odd, even, odd,
 * even, etc. Also the number at the previous card should be strictly
 * less than the number at the next.
 * 
 * Rick carefully shuffled the cards and set to work. We wanted to
 * find the longest sequence of cards that met the conditions. Your
 * task is to return the length of such longest sequence.
 * 
 * Example
 * 
 * For cards = [3, 2, 8, 1, 4, 3], the output should be
 * maxCardSequence(cards) = 4.
 * 
 * As the sequence [1, 2, 3, 8] is a good sequence of cards.
 */
maxCardSequence = c =>
    // get strictly increasing sequence
    c.sort((a, b) => a - b)

    // filter out duplicates
    .filter((e, i, a) => e !== a[i - 1])

    // count # of flip-flops
    .reduce((t, e, i, a) => 
        t += i >= 0 && e % 2 !== a[i - 1] % 2 ? 1 : 0
    , 0)
