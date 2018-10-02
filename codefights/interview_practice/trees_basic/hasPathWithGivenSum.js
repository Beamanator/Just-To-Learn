/**
 * Name: Has Path With Given Sum
 * Difficulty: 1000
 * Time: 12:53
 */
//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function hasPathWithGivenSum(t, s, sum = 0) {
    // if current tree is empty, we didn't find the sum
    if (!t) return false;
    
    // calculate new sum
    let newSum = sum + t.value;

    // if we're at the end of the leaf and sum is correct, we succeeded!
    if (!t.right && !t.left && newSum == s) return true;
    
    // move to tree's left & right branches, passing along current sum
    let leftTree = hasPathWithGivenSum(t.left, s, newSum);
    let rightTree = hasPathWithGivenSum(t.right, s, newSum);
    
    // pass along tree success / fails
    if (leftTree || rightTree) return true;
    else return false;
}
