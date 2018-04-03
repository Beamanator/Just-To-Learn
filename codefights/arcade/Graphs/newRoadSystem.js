/**
 * Name: New Road System
 * Graphs Arcade #: 1
 * 
 * Once upon a time, in a kingdom far, far away, there lived a king
 * Byteasar I. As a kind and wise ruler, he did everything in his
 * (unlimited) power to make life of his subjects comfortable and
 * pleasant. One cold evening a messenger arrived to the king's castle
 * with the latest news: all kings in the Kingdoms Union started to
 * enforce traffic laws! In order not to lose his membership in the
 * Union, king Byteasar had to do the same in his kingdom. But what
 * would the citizens think of it?
 * 
 * The king decided to start introducing the changes with something
 * more or less simple: change all the roads in the kingdom from
 * two-directional to one-directional. He personally prepared the
 * roadRegister of the new roads, and now he needs to make sure that
 * the road system is convenient and there will be no traffic jams,
 * i.e. each city has the same number of incoming and outgoing roads.
 * As the Hand of the King, you're the one who should check it.
 * 
 * Examples
 * 
 * For
 * 
 * roadRegister = [[false, true,  false, false],
 *                  [false, false, true,  false],
 *                  [true,  false, false, true ],
 *                  [false, false, true,  false]]
 * 
 * the output should be
 * newRoadSystem(roadRegister) = true.
 * 
 * The cities will be connected as follows:
 * [diagram on website]
 * 
 * Cities 0, 1 and 3 (0-based) have one incoming and one outgoing roads, and city 2 has two incoming and two outgoing roads. Thus, the output should be true.
 * 
 * For
 * 
 * roadRegister = [[false, true,  false, false, false, false, false],
 *                  [true,  false, false, false, false, false, false],
 *                  [false, false, false, true,  false, false, false],
 *                  [false, false, true,  false, false, false, false],
 *                  [false, false, false, false, false, false, true ],
 *                  [false, false, false, false, true,  false, false],
 *                  [false, false, false, false, false, true,  false]]
 * 
 * the output should be
 * newRoadSystem(roadRegister) = true.
 * 
 * The cities will be connected as follows:
 * [diagram on website]
 * 
 * Each city has one incoming and one outgoing road.
 * 
 * For
 * 
 * roadRegister = [[false, true,  false],
 *                  [false, false, false],
 *                  [true,  false, false]]
 * 
 * the output should be
 * newRoadSystem(roadRegister) = false.
 * 
 * The cities will be connected as follows:
 * [diagram on website]
 * 
 * City 1 has one incoming and none outgoing roads, and city 2 has one outgoing and no incoming roads.
 * 
 * @param {object} roadRegister 
 * @returns {boolean}
 */
function newRoadSystem(roadRegister) {
    let cityRoadHolder = [];
    
    for (let i = 0; i < roadRegister.length; i++) {
        let road = roadRegister[i];
        
        for (let j = 0; j < road.length; j++) {
            if (road[j]) {
                if (cityRoadHolder[i]) {
                    // road obj already exists
                    if (cityRoadHolder[i]['to']) {
                        // 'to' node exists:
                        cityRoadHolder[i]['to'].push(j);
                    } else {
                        cityRoadHolder[i]['to'] = [j];
                    }
                } else {
                    // build it
                    cityRoadHolder[i] = {to: [j]};
                }
                
                if (cityRoadHolder[j]) {
                    // road obj already exists
                    if (cityRoadHolder[j]['from']) {
                        // 'from' node exists:
                        cityRoadHolder[j]['from'].push(i);
                    } else {
                        cityRoadHolder[j]['from'] = [i];
                    }
                } else {
                    // build it
                    cityRoadHolder[j] = {from: [i]};
                }
            }
        }
    }
    
    for (let i = 0; i < cityRoadHolder.length; i++) {
        let roadObj = cityRoadHolder[i];
        
        let toArr = roadObj.to,
            fromArr = roadObj.from;
        
        if (!toArr || !fromArr || toArr.length !== fromArr.length)
            return false;
    }
    
    return true;
}
