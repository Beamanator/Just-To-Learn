/**
 * Name: School Supplies
 * Date: 30 Sept 2018
 */
// chars: 414
schoolSupplies = (supplies, prices, priceIndex = -1, map={}) => {
    supplies.forEach(text => {
        let [quantity, ...item] = text.split(' ');
        // item may have space in it, so add it back in
        item = item.join(' ');
        
        // convert quantity to int
        quantity = +quantity;
        
        // remove ending 's' for plurals
        if (quantity == 0 || quantity > 1)
            item = item.substr(0, item.length-1);
        
        // if item isn't in map yet, increment index + create
        // mapping holder
        if (!map[item]) {
            priceIndex++;
            map[item] = { price: prices[priceIndex], quantity: 0 }
        }
        map[item].quantity += quantity;
    });
    
    // add prices 
    return Object.entries(map).reduce((total, [_, { price, quantity }]) =>
        total + price * quantity
    , 0);
}