/**
 * Name: Equal Pair of Bits
 * Core Arcade #: 24
 * 
 * Note: opposite of differentRightmostBit.js
 * 
 * @param {any} n 
 * @param {any} m 
 * @returns 
 */
function differentRightmostBit(n, m) {
    return ((n, m) => {
        n = n.toString(2).split('').reverse();
        m = m.toString(2).split('').reverse();
        
        let l = Math.max(n.length, m.length);
        
        for (let i = 0; i < l; i++) {
            if (~~n[i] == ~~m[i]) return 2**i;
        }
    })(n, m);
  }