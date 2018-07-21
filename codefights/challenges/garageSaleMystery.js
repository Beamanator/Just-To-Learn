/**
 * Name: Garage Sale Mystery
 * Date: 21 July 2018
 * Note: i guess we don't have to worry about 0's being used...
 * There are a decent amount of comments agreeing with me. The
 * one offering the challenge made leading zeros allowed, so 
 * stickers with the number '0' could just be placed on the far-left
 * side of prices, rendering them useless. Originally I left a reminder
 * for myself to come back and handle them if needed, but luckily
 * this was not necessary.
 */
// 123 chars
garageSaleMystery = (s, I) => {
    n=[]

    // sort reversed
    s.sort((a,b) => b-a)

    // group & add largest (left-most) elements into single array index
    .forEach((e, i) => n[Z = ~~(i / I)] = ~~n[Z] + e)

    // add 'em up!
    return n.reduce((t, e, i) => t + e * 10**i, 0)
}