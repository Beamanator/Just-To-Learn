/**
 * Name: Kth Smallest In BST
 * Difficulty: Medium (30 min)
 * Time: 56 min - oops
 */
//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function kthSmallestInBST(t, k) {
    let count = 0,
        found = false,
        value = null;
    
    let tryNext = (node) => {
        if (!found) {
            if (node.left) tryNext(node.left);
            
            count++;
            
            if (count == k) {
                found = true;
                value = node.value;
            }
            
            if (!found && node.right) tryNext(node.right);
        }
    }
    
    if (t) tryNext(t);
    
    return value;
}
