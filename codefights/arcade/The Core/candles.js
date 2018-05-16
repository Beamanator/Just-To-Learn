/**
 * Name: Candles
 * Core Arcade #: 33
 * 
 * Description:
 * When a candle finishes burning it leaves a leftover. makeNew leftovers 
 * can be combined to make a new candle, which, when burning down, will in
 * turn leave another leftover.
 * 
 * You have candlesNumber candles in your possession. What's the total
 * number of candles you can burn, assuming that you create new candles
 * as soon as you have enough leftovers?
 * 
 * Example
 * 
 * For candlesNumber = 5 and makeNew = 2, the output should be
 * candles(candlesNumber, makeNew) = 9.
 * 
 * Here is what you can do to burn 9 candles:
 * 
 * - burn 5 candles, obtain 5 leftovers;
 * - create 2 more candles, using 4 leftovers (1 leftover remains);
 * - burn 2 candles, end up with 3 leftovers;
 * - create another candle using 2 leftovers (1 leftover remains);
 * - burn the created candle, which gives another leftover (2 leftovers 
 *      in total);
 * - create a candle from the remaining leftovers;
 * - burn the last candle.
 */
function candles(candlesNumber, makeNew) {
    // burn them all!
    let tot = numLeft = candlesNumber;
    
    while (numLeft >= makeNew) {
        // make new ones + burn them
        let change = ~~(numLeft / makeNew);
        
        // we burned these, so add to total
        tot += change;
        
        // remaining = # remaining + # new we made + burned
        numLeft = (numLeft % makeNew) + change;
    }
    
    return tot;
}
