/**
 * Name: Least Appearance
 * 
 * We'd like to construct a diverse array of numbers. At each step,
 * we'll be given two choices for the next number we can add, and
 * we'd like to select the number that appears least frequently in
 * our array so far. If both numbers appear with equal frequency,
 * we'll choose the smaller one.
 * 
 * Our choices will be given in the form of an array, choices,
 * consisting of 2-element arrays of integers.
 * 
 * Example
 * 
 * For choices = [[1, 2], [3, 4], [1, 2]], the output should be
 * leastAppearance(choices) = [1, 3, 2].
 * 
 * Initially, our array is empty, so given the choice between 1 and
 * 2, we'll pick 1 since it's smaller.
 * 
 * On the next step, our array looks like [1], which doesn't contain
 * 3 or 4, so we'll pick 3 (again, because it's smaller than 4).
 * 
 * On the final step, our array looks like [1, 3], so we'll pick 2
 * since the array already contains a 1.
 */
leastAppearance = c => {
    let O = [], C = {};
    
    for (let e of c) {
        // sort elem so we know the smallest value is i=0
        let [a,b] = e.sort((X,Y) => X-Y),
            A = ~~C[a], B = ~~C[b];
        
        if (A <= B) {
            O.push(a)
            C[a] = A + 1;
        } else {
            O.push(b)
            C[b] = B + 1;
        }
    }
    
    return O;
}