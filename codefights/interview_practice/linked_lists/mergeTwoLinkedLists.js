// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
/**
 * Note: Your solution should have O(l1.length + l2.length) time complexity, since this is what you will be asked to accomplish in an interview.
 * 
 * Given two singly linked lists sorted in non-decreasing order, your task is to merge them. In other words, return a singly linked list,
 * also sorted in non-decreasing order, that contains the elements from both original lists.
 * 
 * Example
 * 
 * For l1 = [1, 2, 3] and l2 = [4, 5, 6], the output should be
 * mergeTwoLinkedLists(l1, l2) = [1, 2, 3, 4, 5, 6];
 * 
 * For l1 = [1, 1, 2, 4] and l2 = [0, 3, 5], the output should be
 * mergeTwoLinkedLists(l1, l2) = [0, 1, 1, 2, 3, 4, 5].
 * 
 * @param {any} l1 
 * @param {any} l2 
 * @returns 
 */
function mergeTwoLinkedLists(l1, l2) {
    // constraints say size can be 0 (empty) -> return other list
    if (!l1) return l2;
    if (!l2) return l1;
    
    // convert ListNodes to js-readable objects
    l1 = Object(l1); l2 = Object(l2);
    
    let START = l1; // -> save start reference for later :)
    
    // here there's at least 1 more node ine 1 list, so continue
    do {
        // check if l1 value stays in current position
        if (l1.value <= l2.value) {
            // if l1.next is empty, set list to rest of l2 and break;
            if (!l1.next) {
                l1.next = l2;
                break;
            }
            
            // otherwise, just continue l1 to next node
            else {
                l1 = l1.next;
            }
            
        }
        
        // else, l2 needs to replace l1's current position and point to next node
        else {
            // 1) create copy of l1
            let temp = {...l1};
            // 2) set current l1 value to l2 value
            l1.value = l2.value;
            // 3) set l1.next to old copy of l1 to keep link in tact
            l1.next = temp;
            
            // if l2.next is empty, break (rest of l1 is already linked)
            if (!l2.next) {
                break;
            }
            
            // otherwise, point l2 to next node
            else {
                l2 = l2.next;
            }
        }
    }
    // keep looping until 
    while (l1 || l2);
    
    return START;
}
