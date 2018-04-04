/**
 * Name: Efficient Road Network
 * Graphs Acrade #: 3
 * 
 * Once upon a time, in a kingdom far, far away, there lived a king
 * Byteasar III. As a smart and educated ruler, he did everything in his
 * (unlimited) power to make every single system of his kingdom efficient.
 * The king went down in history as a great road builder: during his
 * reign a great number of roads were built, and the road system he
 * created was the most efficient for those dark times.
 * 
 * When you started to learn about Byteasar's III deeds in your
 * history classes, the creeping doubt crawled into the back of your
 * mind: what if the famous king wasn't so great after all? According
 * to the most recent studies, there were n cities in the Byteasar's
 * kingdom, which were connected by the two-ways roads. You managed
 * to get information about this roads from the university library,
 * so now you can write a function that will determine whether the
 * road system in Byteasar's kingdom was efficient or not.
 * 
 * A road system is considered efficient if it is possible to travel
 * from any city to any other city by traversing at most 2 roads.
 * 
 * Example
 * 
 * For n = 6 and
 * 
 * roads = [[3, 0], [0, 4], [5, 0], [2, 1],
 *          [1, 4], [2, 3], [5, 2]]
 * 
 *  the output should be
 * efficientRoadNetwork(n, roads) = true.
 * 
 * Here's how the road system can be represented:
 * [see diagram online]
 * 
 * For n = 6 and
 * 
 * roads = [[0, 4], [5, 0], [2, 1],
 *          [1, 4], [2, 3], [5, 2]]
 * the output should be
 * efficientRoadNetwork(n, roads) = false.
 * 
 * Here's how the road system can be represented:
 * [see diagram online]
 * 
 * As you can see, it's only possible to travel from city 3 to city 4
 * by traversing at least 3 roads.
 * 
 * @param {any} n 
 * @param {any} roads 
 * @returns 
 */
function efficientRoadNetwork(n, roads) {
    // create map of road connections
    let map = {};
    for (let road of roads) {
        let start = road[0],
            end = road[1];
        
        // add start -> end connection
        if (map[start]) map[start].push(end);
        else map[start] = [end];
        
        // add end -> start connection since they're 2-way streets
        if (map[end]) map[end].push(start);
        else map[end] = [start];
    }
    
    // set variable for whether or not kindom has efficient road network
    let efficient = true;
    
    // traverse the roads!
    for (let startRoad = 0; startRoad < n-1; startRoad++) {
        for (let endRoad = startRoad + 1; endRoad < n; endRoad++) {

            // first check if there's a direct mapping between roads
            if (map[startRoad] && !map[startRoad].includes(endRoad)) {
                
                // no match yet, so now look through each of the mappings
                let midCityRoads = map[startRoad];
                
                // set flag for mid city map found
                let midCityMapFound = false;
                
                // loop through mid city road mappings, looking for end road
                for (let road of midCityRoads) {
                    // if mid road map includes the end road, successful map!
                    if (map[road].includes(endRoad)) {   
                        midCityMapFound = true;
                        break;
                    }
                }
                
                // set outside efficiency as same as mid city map. If mid city map
                // found, we can move on! else, the entire kingdom is inefficient.
                efficient = midCityMapFound;
            }
            
            // if road doesn't have any streets mapped, not efficient!
            else if (!map[startRoad]) efficient = false;
            
            // end inner loop if not efficient
            if (!efficient) break;
        }
        // end outer loop if not efficient
        if (!efficient) break;
    }
    
    return efficient;
}
