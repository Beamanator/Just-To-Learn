/**
 * Name: Naming Roads
 * Graphs Arcade #: 5
 * 
 * Once upon a time, in a kingdom far, far away, there lived a king
 * Byteasar V. His predecessor, king Byteasar IV, lived quite a long
 * life, and when Byteasar V finally ascended the throne, he was
 * already 150 years old. The new king had been preparing all his
 * life for his moment of glory and, scared that he wouldn't have
 * enough time to shine, started his reforms right away. The first
 * (and, as it turned out, the last) royal decree, issued within a
 * couple of days after the coronation, ordered the following: all 
 * the road in the kingdom were to be named.
 * 
 * Unfortunately the king didn't have enough time to come up with
 * actual names, so all the roads were to be names with numbers
 * from 0 to roads.length - 1. As a born strategist, Byteasar wanted
 * to make sure that the maps of his kingdom were confusing to enemies,
 * which is why the road names were to be chosen so that no two roads
 * with the neighboring names (i.e. names i and i + 1 for some i) would
 * have a common end at one of the cities.
 * 
 * The archicartographer came up with the names for the roads,
 * but he was not sure if the constraint the king imposed was met.
 * He asked the Greater Power to help him check it. As a Greater Power
 * from the future, you are the one who can help with that. Given the
 * names for the roads the archicartographer came up with, check that
 * no two roads with the neighboring names have a common end.
 * 
 * Example
 * 
 * For
 * 
 * roads = [[0, 1, 0],
 *          [4, 1, 2],
 *          [4, 3, 4],
 *          [2, 3, 1],
 *          [2, 0, 3]]
 * 
 * the output should be
 * namingRoads(roads) = true.
 * 
 * Here's what the given road system looks like:
 * [see diagram online]
 * 
 * @param {any} roads 
 * @returns 
 */
function namingRoads(roads) {
    // set variable for number of road names in kingdom
    let numRoadNames = 0;
    
    // create map of road connections
    let map = {};
    for (let road of roads) {
        // get start / end cities & name of road
        let start = road[0],
            end = road[1],
            roadName = road[2];
        
        // if road name is higher # than highest name, reset value
        if (roadName > numRoadNames) numRoadNames = roadName;
        
        // add start -> end connection
        if (map[start]) map[start].push(roadName);
        else map[start] = [roadName];
        
        // add end -> start connection since they're 2-way streets
        if (map[end]) map[end].push(roadName);
        else map[end] = [roadName];
    }
    
    // setup var that stores success of road naming ruler
    let pass = true;
    
    // loop through each mapping, calculate distance between each name
    Object.values(map).forEach(connections => {
        // create container (cnt) array
        let cnt = [];
        
        // loop through connections and fail if distance < 1
        for (let roadNum of connections) {
            // then check if number is 0 (min #) or numRoadNames (max #)
            if (roadNum === 0) {
                // check if pos[1] or pos[numRoadNames] is defined
                if (cnt[1] || cnt[numRoadNames])
                    return (pass = false);
            }
            else if (roadNum === numRoadNames) {
                // check if pos[0] or pos[numRoadNames-1] is defined
                if (cnt[0] || cnt[numRoadNames - 1])
                    return (pass = false);
            }
            
            // finally, check if positions right or left are defined
            else {
                if (cnt[roadNum - 1] || cnt[roadNum + 1])
                    return (pass = false);
            }
            
            // passed tests above - add roadNum to cnt :)
            cnt[roadNum] = true;
        }
    });
    
    // if we got here, no fails were found in the loop!
    return pass;
}
