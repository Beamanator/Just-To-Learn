// Name: rotateArrayFromIndex
// URL: https://codefights.com/challenge/zgsSAjAL2vstp35ce
function rotateArrayFromIndex(values, start, end) {
    if (start < 0)
        start = 0;
    else if (start >= values.length)
        start = values.length-1;
    
    if (end < 0)
        end = 0;
    if (end >= values.length)
        end = values.length-1;
    
    if (start < end)
        end++;
    
    values.splice(end, 0, values[start]);
    
    if (start > end)
        start++;
    
    return values.slice(0, start)
            .concat(values.slice(start+1, values.length));
}
