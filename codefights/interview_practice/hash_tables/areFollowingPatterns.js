/**
 * Name: Are Following Patterns
 * Time: 9:05
 */
function areFollowingPatterns(strings, patterns) {
    let patContainer = {};
    let strContainer = {};
    
    for (let i = 0; i < strings.length; i++) {
        let str = strings[i];
        let pat = patterns[i];
        
        if (!patContainer[pat]) patContainer[pat] = str;
        if (!strContainer[str]) strContainer[str] = pat;
        
        if (patContainer[pat] !== str) return false;
        if (strContainer[str] !== pat) return false;
    }
    
    return true;
}
