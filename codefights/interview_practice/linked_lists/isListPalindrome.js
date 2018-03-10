// Name: isListPalindrome
// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
/**
 * Note: Try to solve this task in O(n) time using O(1) additional space,
 * where n is the number of elements in l, since this is what you'll be
 * asked to do during an interview.
 * 
 * Given a singly linked list of integers, determine whether or not it's a
 * palindrome.
 * 
 * @param {singly-linked list} l 
 * @returns {boolean} - true / false if list is a palendrome
 */
function isListPalindrome(l) {
    // handle empty linked list
    if (!l) return true;
    
    // convert linked list into js-handlable object
    l = Object(l);
    
    // create arr to store 'value's in
    let pal = [l.value];
    
    // loop through list, adding values to pal
    while (l.next) {
        l = l.next;
        pal.push(l.value);
    }
    
    // loop through arr to check if it's a pal
    for (let i = 0; i < Math.floor(pal.length / 2); i++) {
        if (pal[i] !== pal[pal.length - 1 - i])
            return false;
    }
    
    // no mis-matches, so true!
    return true;
}
