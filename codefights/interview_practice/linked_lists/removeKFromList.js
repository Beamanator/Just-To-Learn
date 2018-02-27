// Name: removeKFromList
// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
/**
 * Note: Try to solve this task in O(n) time using O(1) additional space, where n is the number of elements in the list, since this is what you'll be asked to do during an interview.
 * 
 * Given a singly linked list of integers l and an integer k, remove all elements from list l that have a value equal to k.
 * 
 * @param {ListNode} l 
 * @param {number} k 
 * @returns ListNode
 */
function removeKFromList(l, k) {
    // handle empty linked list
    if (!l) return null;
    
    // convert linked list into js-handlable object
    l = Object(l);
    
    
    let start = null,
        nextNode = l;
    
    // determine correct start node, quitting if we find one or no more nodes to search through
    while (!start && nextNode) {
        // start at next node
        start = nextNode;
        
        // if start exists and value is k, find next start node (don't count this one)
        if (start && start.value == k) {
            start = null;
            nextNode = nextNode.next;
        } else {
            // do nothing, and let loop exit
        }
    }
    
    // if no start found and no next node, 
    if (!start && !nextNode) return null;
    
    // next, move to following nodes, removing any matches to k
    let prevNode = start;
    nextNode = start.next;
    
    // loop until no more nextNode available
    while (nextNode) {
        // if nextNode should be removed, point nodes around this one
        if (nextNode.value == k) {
            prevNode.next = nextNode.next;
            nextNode = prevNode.next;
        }
        
        // else, just move prevNode and nextNode up 1 in the chain
        else {
            prevNode = nextNode;
            nextNode = prevNode.next;
        }
    }
    
    return start;
}
