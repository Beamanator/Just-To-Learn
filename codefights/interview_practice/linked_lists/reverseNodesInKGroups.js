/**
 * Name: Reverse Nodes in K Groups
 * Date: 8 Nov 2018
 * Difficulty: Hard (45 min)
 * Time: 79 min (lots of distractions + 10 min break)
 * Note: I think this might be O(2n) not O(n)?
 */
// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function reverseNodesInKGroups(l, k) {
    let FIRST = null, NEXT = null;
    let nodeCount = k, currNode = l;
    
    // loop until the previous nodeCount is less than k
    while (nodeCount === k) {
        let nodes = [];
        
        // make a group of nodes (size <= k)
        while (nodes.length < k && currNode !== null) {
            nodes.push(currNode);
            currNode = currNode.next;
        }
        nodeCount = nodes.length;
        
        // reverse the nodes IF there's the proper #
        if (nodeCount == k) nodes.reverse();
        
        // add nodes back in correct order
        for (let i = 0; i < nodeCount; i++) {
            let nextNode = nodes[i];
            
            if (NEXT == null) {
                // first and next are the same node :)
                FIRST = NEXT = nextNode;
            } else {
                // set NEXT + move next to next next haha
                NEXT.next = nextNode;
                NEXT = NEXT.next;
            }
        }
    }
    
    // set the last node's next to null, just in case
    NEXT.next = null;
    
    return FIRST
}
