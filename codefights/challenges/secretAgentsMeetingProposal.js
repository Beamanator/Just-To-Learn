/**
 * Name: Secret Agents Meeting Proposal
 * Date: 7 Nov 2018
 */
// 513 chars - impressive? no?
// cumulative number diff to add
A = 0
// cypher
C = {
    0: 'a', 9: 'e', 8: 'i', 7: 'o', 6: 'u', 5: 'y',
    4: 'w', 10: 't', 11: 'd', 12: 's', 13: 'n', 14: 'm',
    15: 'r', 16: 'b', 17: 'k', 18: 'p',
    '*': 'morning', '@': 'afternoon', '#': 'night', '?': '-',
    '_': ''
}
// main fn
secretAgentsMeetingProposal = (M, D) =>
    // decode message
    M.split('.').reduce(
        ([m], c, i) => {
            if (c == '_') A += D
            return [
                m + (isNaN(+c) ? C[c] : C[+c + A]), 1
            ]
        },
        [''] // decoded message
    )
    // determine 'yes' / 'no' from decoded message
    .map((e, i) => {
        // set day (D), place (P), time (T)
        if (i == 0) {
            let [D, T, P] = e.split('-')
            S = (
                D == 'today' && P == 'park' ? 1 :
                D == 'tomorrow' && (
                    (P == 'bar' && T == C['#']) || (P == 'park' && T == C['@'])
                ) ? 1 :
                D == 'twodays' && P == 'restaurant' && T == C['*'] ? 1 : 0
            )
            return e
        } else {
            return S ? '5.9.12' : '13.7' // 'yes' : 'no', encoded
        }
    })