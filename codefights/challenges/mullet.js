/**
 * Name: Mullet
 * Type: Reverse Challenge
 * Date: 19 Apr 2018
 * 
 * @param {any} business 
 * @param {any} party 
 * @returns 
 */
f = (s, n) => s.repeat(n).split(';').slice(0, n);
mullet = (b, p) =>
    [
        ...f("  ######## ;", b),
        "   @@  ### ", 
        "  /    ### ", 
        "   -   ### ", 
        "  (__  ### ", 
        "     ||### ",
        ...f("       ### ;", p - 5)
    ]
    
// long version:
function mullet(business, party) {
    return [
        ..."  ######## ;".repeat(business).split(';')
            .slice(0, business),
        "   @@  ### ", 
        "  /    ### ", 
        "   -   ### ", 
        "  (__  ### ", 
        "     ||### ",
        ..."       ### ;".repeat(party - 5).split(';')
            .slice(0, party - 5)
    ]
}
