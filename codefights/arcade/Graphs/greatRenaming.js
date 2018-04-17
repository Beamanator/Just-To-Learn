/**
 * Name: Great Renaming
 * Graph Arcade #: 6
 * 
 * Once upon a time, in a kingdom far, far away, there lived a king
 * Byteasar VI. As any king with such a magnificent name, he was
 * destined to leave a trace in history. Unfortunately imagination
 * wasn't one of king Byteasar's strong suits, so the reform he came
 * up with was quite simple: the king ordered to rename all the cities.
 * He didn't want to come up with new names (as a king, he'd have to
 * remember them all!), so he ordered the cities to swap their names
 * in such manner that the ith city would have the name of the city
 * number (i + 1)th. The last city in the Byteasar's kingdom would,
 * naturally, get the name of the very first city.
 * 
 * The cartographers were not happy with this reform, since they had to
 * redraw all the maps of the kingdom. Before the reform, information
 * about all the roads between the cities were stored in the roadRegister.
 * Prior to drawing maps, they had to start with updating the register.
 * Your task is to find out what the updated register looked like.
 * 
 * Example
 * 
 * For
 * 
 * roadRegister = [[false, true,  true,  false],
 *                 [true,  false, true,  false],
 *                 [true,  true,  false, true ],
 *                 [false, false, true,  false]]
 * 
 * the output should be
 * 
 * greatRenaming(roadRegister) = [[false, false, false, true ],
 *                                [false, false, true,  true ],
 *                                [false, true,  false, true ],
 *                                [true,  true,  true,  false]]
 * 
 * Here's how the catalog can be represented before and after the
 * Great Renaming
 * [see diagram online]
 * 
 * @param {any} roadRegister 
 * @returns 
 */
function greatRenaming(roadRegister) {
    let numCities = roadRegister.length,
        newRegister = [...new Array(numCities)].map(e => []);
    
    // loop through rows of roads
    for (let city1 = 0; city1 < numCities; city1++) {
        // loop over numCities again since it's a square matrix
        for (let city2 = 0; city2 < numCities; city2++) {
            
            let newCity1 = city1 + 1, newCity2 = city2 + 1;
            let isRoad = false;
    
            // if true, there is a road connecting cities named 'i' and 'j'
            if (roadRegister[city1][city2]) isRoad = true;
            
            // if false, there's no road here
            else {}
            
            // wrap cities around register
            if (newCity1 >= numCities) newCity1 = 0;
            if (newCity2 >= numCities) newCity2 = 0;
            
            // place new city name, or lack thereof!
            newRegister[newCity1][newCity2] = isRoad;
            
            // also remember roadRegister[col][row] is the same!
            newRegister[newCity2][newCity1] = isRoad;
        }
    }
    
    return newRegister;
}
