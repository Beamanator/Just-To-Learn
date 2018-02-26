// Name: treeIsFull
// URL: https://codefights.com/challenge/MJvns2CuaTzeuRZbs
function treeIsFull(leaf_array) {
    o = a(leaf_array)
    
    for (i = 10; i > 0; i--) {
        n = o[i]
        if (!n) continue
        
        if (n % 2 != 0) {
            return 0
        } else {
            r = n / 2
            if (i > 1) {
                if (o[i-1]) {
                    o[i-1] += r
                } else {
                    o[i-1] = r
                }
            }
        }
    }
    
    return 1
}

function a(b) {
    
    o = {}
    
    for (i = 0; i < b.length; i++) {
        j = b[i]
        if (o[j]) {
            o[j]++
        } else {
            o[j] = 1
        }
    }
    return o;
}

// function treeIsFull(leaf_array) {
//     var obj = arrayToObj(leaf_array);
    
//     for (var i = 10; i > 0; i--) {
//         var num = obj[i];
//         if (!num) continue;
        
//         if (num % 2 != 0) {
//             return 0;
//         } else {
//             var over = num / 2;
//             if (i > 1) {
//                 if (obj[i - 1]) {
//                     obj[i-1] += over;
//                 } else {
//                     obj[i-1] = over;
//                 }
                
//             }
//         }
//     }
    
//     return 1;
// }

// function arrayToObj(arr) {
//     var obj = {};
    
//     for (var i = 0; i < arr.length; i++) {
//         var j = arr[i];
//         if (obj[j]) {
//             obj[j]++;
//         } else {
//             obj[j] = 1;
//         }
//     }
//     return obj;
// }