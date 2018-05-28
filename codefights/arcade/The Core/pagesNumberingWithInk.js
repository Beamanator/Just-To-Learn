/**
 * Name: Pages Numbering With Ink
 * Core Arcade #: 46
 * 
 * You work in a company that prints and publishes books. You are
 * responsible for designing the page numbering mechanism in the printer.
 * You know how many digits a printer can print with the leftover ink. Now
 * you want to write a function to determine what the last page of the book
 * is that you can number given the current page and numberOfDigits left.
 * A page is considered numbered if it has the full number printed on it
 * (e.g. if we are working with page 102 but have ink only for two digits
 * then this page will not be considered numbered).
 * 
 * It's guaranteed that you can number the current page, and that you can't
 * number the last one in the book.
 * 
 * Example
 * 
 * For current = 1 and numberOfDigits = 5, the output should be
 * pagesNumberingWithInk(current, numberOfDigits) = 5.
 * 
 * The following numbers will be printed: 1, 2, 3, 4, 5.
 * 
 * For current = 21 and numberOfDigits = 5, the output should be
 * pagesNumberingWithInk(current, numberOfDigits) = 22.
 * 
 * The following numbers will be printed: 21, 22.
 * 
 * For current = 8 and numberOfDigits = 4, the output should be
 * pagesNumberingWithInk(current, numberOfDigits) = 10.
 * 
 * The following numbers will be printed: 8, 9, 10.
 */
// short version:
pagesNumberingWithInk = (C, D, M=1) => {
    
    while (M < 5) {
        if (C < 10**M) {
            let P = (10**M - C) * M;
            if (D > P) {
                D -= P;
                C = 10**M;
            } else {
                return C + ~~(D / M) - 1;
            }
        }
        M++;
    }
    
    return C;
}

// long version:
// function pagesNumberingWithInk(current, numberOfDigits) {
    
//     // handle printing #s less than 10
//     if (current < 10) {
//         let toPrint = 10 - current;
//         if (numberOfDigits > toPrint) {
//             numberOfDigits -= toPrint;
//             current = 10;
//         } else {
//             return current + numberOfDigits - 1;
//         }
//     }
    
//     // handle printing #s between 10 and 99
//     if (current < 100) {
//         let toPrint = (100 - current) * 2;
//         if (numberOfDigits > toPrint) {
//             numberOfDigits -= toPrint;
//             current = 100;
//         } else {
//             return current + ~~(numberOfDigits / 2) - 1;
//         }
//     }
    
//     // handle printing #s between 100 and 999
//     if (current < 1000) {
//         let toPrint = (1000 - current) * 3;
//         if (numberOfDigits > toPrint) {
//             numberOfDigits -= toPrint;
//             current = 1000;
//         } else {
//             return current + ~~(numberOfDigits / 3) - 1;
//         }
//     }
    
//     // handle printing #s between 1000 and 9999
//     if (current < 10000) {
//         let toPrint = (10000 - current) * 4;
//         if (numberOfDigits > toPrint) {
//             numberOfDigits -= toPrint;
//             current = 10000;
//         } else {
//             return current + ~~(numberOfDigits / 4) - 1
//         }
//     }
    
//     return current;
// }
