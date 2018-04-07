/**
 * Name: Buy Ticket
 * Date: 7 Apr 2018
 * 
 * Jackichul is queuing to buy the final ticket VCSA between GAM and
 * EVOS. There are n people queuing but he cannot know exactly his
 * location. He only know that there are not fewer than a people in 
 * front of him and there are not over b people behind him. Find the
 * number of different location that Jackichul can stand.
 * 
 * Example
 * 
 * For n = 4, a = 1 and b = 2, the output should be
 * buyTicket(n, a, b) = 3.
 * 
 */
buyTicket = (n, a, b) => n - b <= a ? n - a : b + 1

/**
 * Longer(er) version:
 * function buyTicket = (n, a, b) => {
 *  if (n - b <= a) return (n - a);
 *  else return (b + 1);
 * }
 */