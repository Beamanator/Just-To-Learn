/**
 * Name: Catalog Update
 * Difficulty: Medium 3000 (15 min)
 * Time: 15:04
 */
function catalogUpdate(catalog, updates) {
    let container = {};
    
    // add catalog to map
    catalog.forEach(([category, ...items]) => {
        if (!container[category]) container[category] = [];
        container[category].push(...items);
    });
    
    // add updates to map
    updates.forEach(([category, ...items]) => {
        if (!container[category]) container[category] = [];
        container[category].push(...items);
    });
    
    // create array version
    let updatedCatalog = [];
    
    // add container categories back to array, sort while adding
    Object.entries(container).forEach(([category, entries]) => {
        if (category !== 'root') updatedCatalog.push([category, ...entries.sort()])
    });
    
    // add back in root node at the end
    if (container.root) updatedCatalog.push(['root', ...container.root.sort()])
    
    // return array sorted on first elements (categories)
    return updatedCatalog.sort(([a], [b]) => (a > b) - (a < b))
}
