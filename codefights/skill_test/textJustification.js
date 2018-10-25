/**
 * Name: Text Justification
 * Difficulty: Medium (50 minutes)
 * Time: 36:04 (boo-ya)
 */
function textJustification(words, l) {
    // ======== separating words into rows ========
    let lines = [], currentLine = [], currentCharAmount = 0;
    for (let word of words) {
        let wordLen = word.length;
        
        // word has to go on the next line
        if (currentCharAmount + wordLen > l) {
            // add old line to lines
            lines.push(currentLine);
            // reset currentLine arr with only this word
            currentLine = [word];
            // new char amount is just this word
            currentCharAmount = word.length + 1;
        }
        // word fits on current line
        else {
            // add to current line
            currentLine.push(word);
            // add char amount
            currentCharAmount += word.length + 1; // add 1 for necessary space
        }
    }
    // add last line to lines
    lines.push(currentLine);
    
    // ======== adding spaces (justification) to words in rows ========
    for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i], newLine = '';
        // justify all lines except the last line
        if (i !== lines.length - 1) {
            // count number of gaps for spaces
            let numGaps = currentLine.length - 1;
            // calculate num spaces needed
            let numSpaces = l - currentLine.reduce((tot, word) => tot + word.length, 0);
            // if - gaps, that means all spaces should be added to the end (just padding)
            if (numGaps == 0) newLine = currentLine[0] + ' '.repeat(numSpaces);
            // else, do some funky calculation
            else {
                // make an array of space lengths
                let spaceLens = [];
                // subtract this number from numSpaces until it goes in evenly
                while (numSpaces % numGaps !== 0) {
                    // get minimum number of spaces
                    let minSpaces = Math.floor(numSpaces / numGaps);
                    spaceLens.push(minSpaces);
                    numSpaces -= minSpaces;
                    numGaps--;
                }
                
                // add the rest of the spaces in
                for (let i = 0; i < numGaps; i++) {
                    spaceLens.push(numSpaces / numGaps);
                }
                
                // reverse the space arr
                spaceLens.reverse();
                
                // add words and spaces together
                for (let i = 0; i < currentLine.length; i++) {
                    // add current word
                    newLine += currentLine[i];
                    // add spaces if needed (not after last word)
                    if (i < currentLine.length - 1) newLine += ' '.repeat(spaceLens[i]);
                }
            }
        }
        // for the last line, just pad with spaces
        else {
            // join words with just 1 space
            newLine = currentLine.join(' ');
            // if the total length is still less than l, pad!
            if (newLine.length < l) {
                let padLength = l - newLine.length;
                newLine += ' '.repeat(padLength);
            }
        }
        lines[i] = newLine;
    }
    
    return lines;
}
