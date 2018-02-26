// Name: dim
// URL: https://codefights.com/challenge/pngP3vJ74YdtyBaWb
function dim(n) {
    return b(n, 1);
}

function b(n, i) {
    return Math.pow(2, i) > n ? i : b(n, i+1);
}