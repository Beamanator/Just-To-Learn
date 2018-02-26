// Name: buildSum
// URL: https://codefights.com/challenge/YqTsRei3LjHNaByFP
function buildSum(n) {
    if (!n) return 1;
    return Math.pow(n, n) + buildSum(n-1);
}
