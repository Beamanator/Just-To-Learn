/**
 * Name: possible Champions
 * Date: 10 July 2018
 * World Cup has proceeded to semifinals! Only four teams remain.
 * One of them will be the champion.
 * 
 * You thought about World Cup all day long, so you saw it in your
 * dreams. For each team, you counted the total number of goals they
 * scored throughout both rounds of the semifinals - you saw that
 * Belgium scored b goals, Croatia scored c goals, England scored
 * e goals, and France scored f goals.
 * 
 * In your dreams there's no game for the third place, so the winners
 * of semifinals play two games, while the losers only play one.
 * Also in your dream you have counted penalties too, so there can't
 * be a game where two teams scored an equal number of goals. Now 
 * given the numbers b, c, e, and f, you want to find out which teams
 * could possibly be the champion in your dream. If you didn't know,
 * semifinal pairs are Croatia vs England and Belgium vs France.
 */
function possibleChampions(b, c, e, f) {
    // get winner of A [b vs f]
    let [winA, goalsA] = [
        b > f ? 'Belgium' : 'France',
        b > f ? b - f - 1 : f - b - 1
    ];
        
    // get winner of B [c vs e]
    let [winB, goalsB] = [
        c > e ? 'Croatia' : 'England',
        c > e ? c - e - 1 : e - c - 1
    ];
    
    if (goalsA < 0 || goalsB < 0)
        return []
    else
        return [
            goalsA > 0 ? winA : null,
            goalsB > 0 ? winB : null
        ]
        .filter(e => e !== null)
        .sort((a,b) =>
             a < b ? -1 :
             a > b ? 1 :
             0
        )
}
