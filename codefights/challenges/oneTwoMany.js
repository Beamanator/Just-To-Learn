/**
 * Name: One Two Many
 * Date: 5 July 2019
 * Difficulty: 2000
 */
// v1 (42 chars)
// oneTwoMany = n => n == 1 ? 'one' : n == 2 ? 'two' : 'many'

// v2 (50)
// oneTwoMany = n => {return {1:'one',2:'two'}[n] || 'many'}

// v3 (39 chars - minimum!)
oneTwoMany = n => [,'one','two'][n] || 'many'