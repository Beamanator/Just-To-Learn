// Name: chainNames
// URL: https://codefights.com/challenge/ZnCxyiiniAywSueqc
function chainNames(names) {
    if (names.length === 1) return names;
    
    var firstNames = {};
    var lastNames = {};
    
    var orderedNames = [];
    
    // Create object for first and alst names:
    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i][0].toLowerCase();
        var lastLetter = names[i][names[i].length-1];
        
        firstNames[firstLetter] = names[i];
        lastNames[lastLetter] = 1;
    }
    
    // find starting name in series:
    for (var key in firstNames) {
        if (firstNames.hasOwnProperty(key)) {
            if (lastNames[key] == undefined) {
                orderedNames[0] = firstNames[key];
                break;
            }
        }
    }
        
    // Add rest of names to orderedNames:
    for (var j = 0; j < names.length - 1; j++) {
        var last = orderedNames[j][orderedNames[j].length - 1];
                
        orderedNames[j+1] = firstNames[last];
    }
    
    return orderedNames;
}
