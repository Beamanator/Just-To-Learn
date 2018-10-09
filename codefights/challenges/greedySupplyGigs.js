/**
 * Name: Greedy Supply Gigs
 * Date: 9 Oct 2018
 * Difficulty: 2000
 */
// 372 chars
greedySupplyGigs = O =>
    O.reduce((C, D) => {
        let max = [0, '']
        // get max amount + school name
        D.forEach(o => {
            let [name, amount] = o.split('$');
            // create node if it doesn't exist
            if (!C[name]) C[name] = [0, 0] // [accept, reject]
            // if school is rejected, skip school
            if (C[name][1] > C[name][0] / 2) return;
            // school hasn't rejected yet, check if amount is greedy
            if (+amount > max[0]) max = [+amount, name];
        });
        // calculate num rejections, etc with max data
        D.forEach(o => {
            let [name, amount] = o.split('$');      
            // if school is rejected, skip school
            if (C[name][1] > C[name][0] / 2) return;
            // if all matches, it's accepted! otherwise rejected
            if (name == max[1] && +amount == max[0]) {
                C[name][0] += 1;
            } else {
                C[name][1] += 1;
            }
        });
        C.t += max[0];
        return C
    }, {t: 0}).t