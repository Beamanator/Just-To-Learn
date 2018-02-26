// Name: shortenedString
// URL: https://codefights.com/challenge/uTaa6ELcB5u6cwifr
function shortenedString(ss) {
    let c = [];
    let level = 0;
    
    for (let i = 0; i < ss.length; i++) {
        let obj = {};
        let char = ss[i];
        
        obj.level = level;
        
        switch(char) {
            case '(':
                level++;
                break;
            
            case ')':
                level--;
                break;
                
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                obj.number = char;
                break;
                
            default:
                obj.char = char;
                // console.log('default:', char);
        }
        
        c.push(obj);
    }
    
    let msg = '';
    let minis = [''];
    level = 0;
    
    for (let i = 0; i < c.length; i++) {
        let obj = c[i];
        
        if (obj.level > level) {
            level++;
            minis[level] = '';
        } else if (obj.level < level) {
            level--;
        }
        
        if (obj.char && obj.char !== ' ') {
            minis[level] += obj.char;
        } else if (obj.number) {
            let count = +obj.number;
            let add = false;
            // maybe 2 digit number
            if (c[i+1] && c[i+1].number) {
                count = count*10 + (+c[i+1].number);
                add = true;
            }
            if (c[i-1] && c[i-1].level === level) { // on the same level
                // add a repeat of the final char in minis[level]
                if (count > 0)
                    minis[level] += minis[level][ minis[level].length - 1 ].repeat(count-1);
                else
                    minis[level] = minis[level].substr(0, minis[level].length - 1);
                
            } else { // on different levels -> went down a level only 
                // repeat above level, stick above level in current level
                minis[level] += minis[level+1].repeat(count);
                // clear above level
                minis[level+1] = '';
            }
            
            if (add) i++;
        }
        
        
        // console.log(minis);
    }
    
    return minis[0]
}
