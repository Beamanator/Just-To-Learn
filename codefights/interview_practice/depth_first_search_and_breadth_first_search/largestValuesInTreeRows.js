/**
 * Name: Largest Values in Tree Rows
 * Difficulty: Easy (30 min)
 * Time: 20 (ish)
 */
function largestValuesInTreeRows(t) {
    // largestValues = output of largest values per row
    // queue = array of current-level tree nodes
    let largestValues = [], queue = [t];
    
    // loop until queue there's no more nodes in current row
    while (queue.length > 0) {
        // nextQueue = array of nodes below 'current' queue nodes
        // nextMax = maximum value out of 'current' queue nodes
        let nextQueue = [], nextMax;
        
        // loop through queue's nodes
        for (let i = 0; i < queue.length; i++) {
            let node = queue[i];
            
            // skip logic if current node is empty
            if (node === null) continue;
            // check if current value is greater than row's max
            if (!nextMax || node.value > nextMax) nextMax = node.value;
            // add left / right nodes if exist
            if (node.left) nextQueue.push(node.left);
            if (node.right) nextQueue.push(node.right);            
        }
        
        // set 'current' row of notes
        queue = nextQueue;
        // if there's a max value for this row push into largest values
        if (nextMax) largestValues.push(nextMax);
    }
    
    return largestValues;
}
