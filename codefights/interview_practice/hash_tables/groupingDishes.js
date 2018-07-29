/**
 * Name: Grouping Dishes
 * Time to complete: 20 minutes
 * My time: 22 minutes
 */
// flatten ingredient arrays
flattenAndSort = (arr) =>
    [arr[0]].concat(...arr[1].sort((a,b) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        else return 0;
    }))

groupingDishes = (dishes) =>
    // convert map into an array
    Object.entries(
        // loop through dishes
        dishes.reduce((ingredientMap, dish, i) => {
            // get dish name
            const dishName = dish[0];

            // loop through items of dish
            dish.slice(1).forEach(ingredient => {

                // check if ingredient doesn't exist in map yet
                if (!ingredientMap[ingredient]) {
                    ingredientMap[ingredient] = [dishName];
                }

                // push ingredient into map, if it doesn't exist already
                else if (!ingredientMap[ingredient].includes(dishName)) {
                    ingredientMap[ingredient].push(dishName);
                }
            });

            return ingredientMap
        }, {})
    )

    // filter out dishes with < 2 combos
    .filter(e => e[1].length > 1)

    // flatten and sort remaining arrays
    .map(e => flattenAndSort(e))

    // sort immediate elements in array
    .sort((a,b) => {
        const dish1 = a[0]; const dish2 = b[0];
        if (dish1 > dish2) return 1;
        else if (dish1 < dish2) return -1;
        else return 0;
    })