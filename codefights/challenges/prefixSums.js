// Name: prefixSums
// URL: https://codefights.com/challenge/5Afg8xaWHX9cQ2Q6f
prefixSums = (a, t=0, i, ...b) => {
    for (i of a)
        b.push(t+=i)
    return b;
}