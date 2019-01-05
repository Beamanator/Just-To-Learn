/**
 * Name: Holiday Potluck
 * Date: 5 Jan 2019
 * Difficulty: 2000
 */
// chars: 111
holidayPotluck = (D, C) =>
    // reverse sort, from first element in arrays
    D.sort((a,b) => b[0]-a[0])
    // add up & return total quantities
    .reduce(
        (t, [q, Q]) => {
            // logic if you can't eat all of the item
            if (Q > C) {
                t += C * q
                C = 0
            }
            // logic if you eat all of the item
            else {
                t += Q * q
                C -= Q
            }
            return t
        }, 0
    )