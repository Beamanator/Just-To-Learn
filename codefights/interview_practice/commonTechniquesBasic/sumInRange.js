/**
 * Name: Sum in range
 * Date: 10 Oct 2018
 * Time: 46:18 (had to learn about prefix sums)
 * Ref: https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/
 */
mod = 1e9 + 7;
function sumInRange(nums, queries) {
    // method #3 - using prefixSum
    let prefixSum = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        // add sum to this point from previous vals in array
        prefixSum[i] = prefixSum[i-1] + nums[i];
    }
    
    return queries.reduce((tot, [from, to]) =>
        // remember to subtract 'from' prefix sum ONLY if it's not 0
        tot + mod + prefixSum[to] - (from == 0 ? 0 : prefixSum[from - 1])
    , 0) % mod
    
    // method #2 (time error on test 13)
    //     let quantities = new Array(nums.length).fill(0);
    //
    //     queries.forEach( ([from, to]) => {
    //         for (let i = from; i <= to; i++) {
    //             quantities[i]++;
    //         }
    //     });
    //  
    //     return nums.reduce((tot, n, i) => {
    //         return tot + (n * quantities[i]) + mod;
    //     }, 0) % mod
    

    // method #1 (time error on test 13)
    //     return queries.reduce((total, [from, to]) => {
    //         let key = from + ',' + to;
    //
    //         if (cont[key]) return total += cont[key];
    //
    //         let sum = nums.slice(from, to + 1).reduce((t, e) => t + e, 0);
    //         cont[key] = sum;
    //
    //         return total + sum + mod;
    //     }, 0) % mod
}
