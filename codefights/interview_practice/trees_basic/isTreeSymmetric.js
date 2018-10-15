/**
 * Name: Is Tree Symmetric
 * Date: 15 Oct 2018
 * Time: 74:39 (I think... ouch)
 * Difficulty: Easy
 */
//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function isTreeSymmetric(t) {
    // empty tree passes (according to test 3)
    if (!t) return true;
    // fail if there's only 1 available node
    if ((t.right && !t.left) || (!t.right && t.left)) return false;

    // get right and left starting queues
    let queueR = [t.right], queueL = [t.left];

    // default to a successful pass
    let pass = true;

    // loop until we run out of nodes to process
    while(queueR.length > 0) {
        // get & remove first values in each queue (BFS)
        let R = queueR.shift();
        let L = queueL.shift();

        // fail if values at related nodes don't match
        if (R.value !== L.value) {
            pass = false;
            break;
        }
        // check right / left symmetric nodes
        if (R.right && L.left) {
            queueR.push(R.right); queueL.push(L.left);
        } else if ((R.right && !L.left) || (!R.right && L.left)) {
            pass = false; break;
        }
        // check left / right symmetric nodes
        if (R.left && L.right) {
            queueR.push(R.left); queueL.push(L.right);
        } else if ((R.left && !L.right) || (!R.left && L.right)) {
            pass = false; break;
        }
    }

    return pass;
}

/**
 * Note: super nice and clean & easily understandable solution (from user Eduard_P_2):
 *  function check(t1, t2) {
        if (t1 == null && t2 == null) {
            return true;
        }
        if (t1 == null || t2 == null || t1.value != t2.value) {
            return false;
        }
        return check(t1.left, t2.right) && check (t1.right, t2.left);
    }

    function isTreeSymmetric(t) {
        return check(t, t);
    }
 */