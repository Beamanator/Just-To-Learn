/**
 * Name: Final Slacker
 * Date: 5 Oct 2018
 * Difficulty: 2000
 */
// 497 chars - too lazy to minify completely
// helper function to sum all nums in array
sum = arr => arr.reduce((tot, elem) => tot + elem, 0);
// main function
function finalSlacker(weights, scores) {
    // get current score
    let c = scores.reduce((all, points, i) => {
        // index 0 == assignments, 1 == quizes, 2 == tests
        let maxPts = i == 0 ? 10 : i == 1 ? 5 : 100;

        // add current weighted score to total
        return all + (sum(points) / points.length) * weights[i] / maxPts;
    }, 0);
    
    // get target minimum grade
    let target = c >= 90 ? 90
        : c >= 80 ? 80
        : c >= 70 ? 70
        : c >= 60 ? 60
        : 0;
    
    // calculate needed score (not clean, but the math makes sense
    // -> if written out ;)
    let neededScore = Math.ceil((
        100 * (target - (sum(scores[0]) * weights[0] / scores[0].length / 10) - (sum(scores[1]) * weights[1] / scores[1].length / 5) ) / weights[2]
        * (scores[2].length + 1)
    ) - sum(scores[2]));
    
    // handle potential negatives (when a 0 is fine)
    if (neededScore <= 0) return 0;
    else return neededScore
}
