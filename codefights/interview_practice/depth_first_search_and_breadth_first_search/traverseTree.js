/**
 * Name: Traverse Tree
 * Difficulty: Easy (30 min)
 * Time: 6:15 (boo-ya)
 * Note: this is a breadth-first search algorithm
 */
function traverseTree(t) {
    let stack = [], container = [];
    
    // if tree exists, traverse!
    if (t) {
        // push original tree into stack
        stack.push(t);
        
        // while stack still has notes to traverse, keep looping
        while (stack.length > 0) {
            // take first element from stack and traverse
            let nextNode = stack.shift();
            
            // add current node's value to output
            container.push(nextNode.value);

            // check if left / right nodes exist. if they do, add them
            // to stack to be traversed later
            if (nextNode.left) stack.push(nextNode.left);
            if (nextNode.right) stack.push(nextNode.right);
        }
    }
    
    return container;
}