// this challenge was to find the appropriate if-condition:
{
    (boundaries[mid] + boundaries[mid + 1]) / 2 < y;
}

// this is the full code, which seems to optimize the number of times
// -> position calculations are made
function reorderingOfProducts(boundaries, y) {
    boundaries.unshift(-Infinity);
    var l = 0,
        r = boundaries.length - 1;
    while (l + 1 < r) {
        var mid = Math.floor((l + r) / 2);
        if ((boundaries[mid] + boundaries[mid + 1]) / 2 < y) {
            l = mid;
        } else {
            r = mid;
        }
    }
    return l;
}
