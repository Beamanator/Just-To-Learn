/**
 * Name: Job Matching Score
 * 
 * Note... Too lazy to make this with minimal characters.
 */
function jobMatchingScore(locations, criteria) {
    let criteriaArr = criteria.split(',').map(e => e.trim());
    
    let matches = locations.reduce((acc, elem, i) => {
        elem = elem.split(',').map(e => e.trim());
        if (criteriaArr.length === 1 &&
            criteriaArr[0] === elem[2]) {
            acc++;
        } else if (criteriaArr.length === 2 &&
            criteriaArr[0] === elem[1] &&
            criteriaArr[1] === elem[2]) {
            acc++;
        } else if (criteriaArr.length === 3 &&
            criteriaArr[0] === elem[0] &&
            criteriaArr[1] === elem[1] &&
            criteriaArr[2] === elem[2]) {
            acc++;
        }
        
        return acc;
    }, 0);
    
    return matches
}
