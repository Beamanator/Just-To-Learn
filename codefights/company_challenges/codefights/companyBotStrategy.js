/**
 * Name: Company Bot Strategy
 * Date: 1 Nov 2018
 * Difficulty: Easy (5 min)
 * Time: 3:21
 */
function companyBotStrategy(trainingData) {
    let numCorrect = 0, sum = 0;
    
    trainingData.forEach(([time, isCorrect]) => {
        if (isCorrect == 1) {
            sum += time;
            numCorrect++;
        }
    });
    
    return numCorrect > 0 ? sum / numCorrect : 0;
}
