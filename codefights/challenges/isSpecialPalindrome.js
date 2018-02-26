// Name: isSpecialPalindrome
// URL: https://codefights.com/challenge/H3xfuW74xaSgAXaSt
function isSpecialPalindrome(n) {
    // convert number to binary
    var biN = convertBinary(n);
    
    console.log(biN);
    
    // check if palindrome
    return checkPali(biN);
}

function checkPali(n) {
    // rule out numbers w/o exactly one 0
    if (n.split('0').length !== 2)
        return false;
    
    // rule out numbers w/out any 1's
    if (n.indexOf('1') === -1)
        return false;
    
    if ( (n.length - 1)/2 === n.indexOf('0') )
        return true;
    
    else
        return false;
}

function convertBinary(n) {
    if (n === 0)
        return '0';
    
    var startIter = getStartIter(n),
        biString = '';
    
    for (let i = startIter; i >= 0; i--) {
        var pow = Math.pow(2, i);
        
        if (pow <= n) {
            biString = '1' + biString;
            n -= pow;
        }
        
        else {
            biString = '0' + biString;
        }
    }
    
    return biString;
}

function getStartIter(n) {
    var iter = 0;
    
    while (Math.pow(2, iter) <= n) {
        iter++;
    }
    
    return iter-1;
}