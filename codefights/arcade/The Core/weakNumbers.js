/**
 * Name: Weak Numbers
 * Core Arcade #: 48
 * 
 * We define the weakness of number x as the number of positive integers
 * smaller than x that have more divisors than x.
 * 
 * It follows that the weaker the number, the greater overall weakness it
 * has. For the given integer n, you need to answer two questions:
 * 
 * what is the weakness of the weakest numbers in the range [1, n]?
 * how many numbers in the range [1, n] have this weakness?
 * Return the answer as an array of two elements, where the first element
 * is the answer to the first question, and the second element is the
 * answer to the second question.
 * 
 * Example
 * 
 * For n = 9, the output should be
 * weakNumbers(n) = [2, 2].
 * 
 * Here are the number of divisors and the specific weakness of each number
 * in range [1, 9]:
 * 
 * 1: d(1) = 1, weakness(1) = 0;
 * 2: d(2) = 2, weakness(2) = 0;
 * 3: d(3) = 2, weakness(3) = 0;
 * 4: d(4) = 3, weakness(4) = 0;
 * 5: d(5) = 2, weakness(5) = 1;
 * 6: d(6) = 4, weakness(6) = 0;
 * 7: d(7) = 2, weakness(7) = 2;
 * 8: d(8) = 4, weakness(8) = 0;
 * 9: d(9) = 3, weakness(9) = 2.
 * As you can see, the maximal weakness is 2, and there are 2 numbers with
 * that weakness level.
 */
// return # of divisors of passed-in number
D = n =>
    [...Array(n)].filter((_, i) =>
        n % (i+1) == 0)

// main function
weakNumbers = n =>
    // make array w/ len n
    [...Array(n)]
        // get array of divisors
        .map((_, i) => D(i + 1).length)

        // convert divisor array to weakness array
        .reduce((w, e, i, a) => {
            
            w.push(
                a.slice(0, i + 1).reduce((T, E, I, A) =>
                    // only add if prev element is larger than current
                    // being checked (A[i])
                    T + (I == (i + 1) ? 0 :
                        E > A[i] ? 1 : 0)
                , 0)
            );
            return w
            
        }, [])

        // count number of similar weaknesses
        .reduce((w, e) => {
            w[e] = ~~w[e] + 1;
            return w;
        }, [])

        // get final value & count in new 2-item arr
        .reduce((o, e, i, a) =>
            i == a.length-1 ? [i, e] : [], [])
