// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
/**
 * You're given 2 huge integers represented by linked lists. Each linked list element
 * is a number from 0 to 9999 that represents a number with exactly 4 digits. The
 * represented number might have leading zeros. Your task is to add up these huge integers
 * and return the result in the same format.
 * 
 * Examples:
 * 
 * For a = [9876, 5432, 1999] and b = [1, 8001], the output should be
 * addTwoHugeNumbers(a, b) = [9876, 5434, 0].
 * 
 * Explanation: 987654321999 + 18001 = 987654340000.
 * 
 * For a = [123, 4, 5] and b = [100, 100, 100], the output should be
 * addTwoHugeNumbers(a, b) = [223, 104, 105].
 * 
 * Explanation: 12300040005 + 10001000100 = 22301040105.
 * 
 * @param {ListNode} a - first list 
 * @param {ListNode} b - second list
 * @returns {ListNode} - sum of lists, no values greater than 9999
 */
function addTwoHugeNumbers(a, b) {
    // constraints say size can be 0 (empty) right?
    if (!a) return b;
    if (!b) return a;
    
    // convert ListNodes to js-readable objects
    a = Object(a); b = Object(b);
    
    // get new vars for counting
    let A = {...a}, B = {...b};
    
    // get lengths of each list
    let lenA = 0, lenB = 0;

    do { lenA++; }
    while (A = A.next);
    
    do { lenB++; }
    while (B = B.next);
    
    // set longer list as list to add to, and shorter list as list to get values from
    let long, small;
    if (lenA > lenB) { long = a; small = b; }
    else {long = b; small = a; }
    
    let START = long; // -> return this later :)
    
    // move to proper starting index of long
    let lenDiff = Math.abs(lenA - lenB);
    while (lenDiff > 0) {
        long = long.next;
        lenDiff--;
    }
    
    // now add values to each other
    let handleOverflowFlag = false;
    do {
        let newValue = long.value + small.value;
        
        long.value = newValue;
        small = small.next;
        
        // if newValue > 9999, set flag to loop back through
        if (newValue > 9999) handleOverflowFlag = true;
    } while (long = long.next);
    
    // if any value was over 9999, we have to loop through the whole thing, changing values :D
    let nextNode, prevNode;
    while (handleOverflowFlag) {
        handleOverflowFlag = false;
        
        nextNode = START;
        prevNode = null;
        
        do {
            // check if we have to handle overflow in this node
            if (nextNode.value > 9999) {
                // if prevNode exists, add overflow to that node, remove overflow from this node, check if prevNode is now overflow
                if (prevNode) {
                    prevNode.value += Math.floor(nextNode.value / 10000);
                    nextNode.value = nextNode.value % 10000;
                    
                    if (prevNode.value > 9999) handleOverflowFlag = true;
                }
                
                // prevNode doesn't exist, so make new copy & add it to the beginning
                else {
                    prevNode = {...nextNode};
                    prevNode.value = Math.floor(nextNode.value / 10000);
                    prevNode.next = nextNode;
                    nextNode.value = nextNode.value % 10000;
                    
                    START = prevNode;
                }
            }
            // update prevNode
            prevNode = nextNode;
        }
        while (nextNode = nextNode.next);
    }
    
    return START;
}
