/**
 * Name: Swap Adjacent Words
 * Difficulty: Easy (20 min)
 * Time: 16:00
 * Note: Can only edit the regexp & 2nd param of `s.replace` in this problem
 * First, either match strings with 'word + space + word' or 'word' (for odd # of words)
 * Second, split space, swap 1st and 2nd words OR return word (if only 1 word)
 */
function swapAdjacentWords(s) {
    return s.replace(/([\w]+ [\w]+)|[\w]+/g, (x) =>
        x.indexOf(' ') !== -1 ? `${x.split(' ')[1]} ${x.split(' ')[0]}` : x
    );
}

/**
 * Note : other solutions are much simpler! These are NOT MINE! I didn't know they were possible!
 * return s.replace(/(\w+) (\w+)/g, "$2 $1");
 * return s.replace(/(\w+) (\w+)/g, (a, b, c) => `${c} ${b}`);
 */