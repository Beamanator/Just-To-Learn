// Name: TwoFive
// URL: https://codefights.com/challenge/xhBAsg5cyGsynNcHj
function TwoFive(a) {
    
    // loop backwards through array a via for-loop
        // turn each index into binary [base 2, 8 digits]
        // combine all into 1 long string 
    // next, break string into groups of 5. If extra digits are needed, pad w/ 0's on left
    // loop through array to turn 0's and 1's into #'s [base 10]
    // translate those numbers into dictionary letters
    var d = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
    
    var bitString8 = '';
    
    for (var i = a.length - 1; i >= 0; i--) {
        bitString8 += intToBit8(a[i]);
    }
    
    var bitString32 = addZeroes(bitString8);
    
    var base32Arr = [];
    
    for (var j = 0; j < bitString32.length; j++) {
        var index = Math.floor(j/5);
        
        if (base32Arr[index] == undefined) base32Arr[index] = bitString32[j];
        else base32Arr[index] += bitString32[j];
    }
    
    var decArr = [];
    decArr = array32ToDecimal(base32Arr);
    
    var finalString = '';
    
    for (var k = decArr.length - 1; k >= 0; k--) {
        finalString += d[decArr[k]];
    }
    
    console.log(finalString);
    
    return finalString;
    
}

function array32ToDecimal(arr) {
    var decArr = [];
    
    for (var i = 0; i < arr.length; i++) {
        decArr[i] = 0;
        
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == "1")
            decArr[i] += Math.pow(2, (5 - (j + 1)) );
        }
    }
    
    return decArr
}

function addZeroes(string) {
    var zeroesToAdd = 5 - (string.length % 5);
    var zeroString = "";
    
    if (zeroesToAdd == 5) return string;
    else {
        for (var i = 0; i < zeroesToAdd; i++) {
            zeroString += "0";
        }
    }
    
    return zeroString + string;
}

function intToBit8 (num) {
    var bitString = '';
    
    for (var k = 7; k >= 0; k--) {
        if (Math.pow(2,k) <= num) {
            bitString += "1";
            num -= Math.pow(2,k);
        } else {
            bitString += "0";
        }
    }
    
    return bitString;
}