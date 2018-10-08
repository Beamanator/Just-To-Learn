/**
 * Name: kth Largest Element
 * Difficulty: 1000
 */
// oof, i think this is actually cheating
kthLargestElement = (nums, k) =>
    nums.sort((a,b) => b-a)[k-1]
