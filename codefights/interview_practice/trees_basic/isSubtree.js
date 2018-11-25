/**
 * Name: Is Subtree
 * Difficulty: Medium (30 min)
 * Time: 22 min
 */
//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
let tryMatch = (t1, t2) => {
    // if both nodes are blank, everything before must have matched!
    // -> this branch matches
    if (!t1 && !t2) return true;
    // if one node exists and the other doesn't, fail
    if ((t1 && !t2) || (!t1 && t2)) return false;
    // if values are the same, great! now try to match the next left & right trees 
    if (t1.value == t2.value) return tryMatch(t1.left, t2.left) && tryMatch(t1.right, t2.right);
    // at this point, both nodes exist (t1 and t2) but they're not the same value, so fail
    return false;
}
// main function
function isSubtree(t1, t2) {
    let match = false;
    
    if (!t2) return true;
    if (!t1) return false;
    
    // function searches through all existing nodes of t1 for matches with t2
    let search = (node) => {
        if (!node || match) return; // quit early if possible
        
        // if match, we good!
        if (tryMatch(node, t2)) match = true;
        // otherwise, search for matches in next left & right nodes
        else {
            search(node.left);
            search(node.right);
        }
    }
    
    // kick off search
    search(t1);
    
    return match;
}
