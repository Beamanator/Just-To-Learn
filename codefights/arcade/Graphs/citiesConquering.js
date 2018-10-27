/**
 * Name: Cities Conquering
 * Date: 27 Oct 2018
 * Note: Started months ago, couldn't fix it, fixed within 15 minutes today
 */
function citiesConquering(n, roads) {
    let cityRoadMap = roads.reduce((map, Roads) => {
        let [A, B] = Roads;
        // add connection to city A
        if (!map[A]) map[A] = [];
        map[A].push(B);
        
        // add connection to city B
        if (!map[B]) map[B] = [];
        map[B].push(A);
        
        return map;
    }, [...Array(n)]).map(e => !e ? [] : e);
    
    // create arr for when cities were destroyed (filled with -1)
    let cityLastedNumDays = [...Array(n)].fill(-1);
    let dayNumber = 1;
    
    while (true) {
        // simulate 1 day!
        let newRoadState = [...cityRoadMap], roadsChanged = false;
        
        // loop through map, simulating destruction
        for (let i = 0; i < cityRoadMap.length; i++) {
            
            if (cityLastedNumDays[i] !== -1) continue; // already destroyed, so skip
            
            const connectedRoads = cityRoadMap[i];
            
            // check if city should get destroyed
            if (!connectedRoads || connectedRoads.length <= 1) {
                // mark day the city was destroyed
                cityLastedNumDays[i] = dayNumber;
                
                // if no roads, conquer!!
                if (!connectedRoads.length) {
                    cityLastedNumDays[i] = dayNumber;
                }
                
                // if 1 road, remove it & remove from connected city
                else {
                    roadsChanged = true;

                    let brokenRoad = connectedRoads[0]; // the 1 and only connection
                    let roadIndex = newRoadState[brokenRoad].indexOf(i);

                    // remove connecting road from current city
                    newRoadState[i] = []

                    // remove connecting road from broken-road city
                    newRoadState[brokenRoad] = newRoadState[brokenRoad]
                        .slice(0, roadIndex)
                        .concat(newRoadState[brokenRoad].slice(roadIndex + 1));
                }
            } else {} // do nothing yet!
        }
        
        cityRoadMap = newRoadState;
        
        // stop looping if roads didn't change
        if (!roadsChanged) break;
        
        // increment day number
        dayNumber++;
    }
    
    return cityLastedNumDays;
}
