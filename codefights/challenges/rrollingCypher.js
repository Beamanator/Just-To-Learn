/**
 * Name: rrolling Cypher
 * Reverse Challenge
 * Date: 25 Apr 2018
 * 
 * Description = rick-rolling cypher ;)
 */
e = `Never gonna `
f = `give you up
`
g = `let you down
`
h = `run around and desert you
`
i = `make you cry
`
j = `say goodbye
`
k = `tell a lie and hurt you
`
l = `We've known each other for so long
Your heart's been aching but you're too shy to say it
Inside we both know what's been going on
We know the game and we're gonna play it
`
m = `I just wanna tell you how I'm feeling
Gotta make you understand
`
n = `give, never gonna give
`
o = e + n + `(Give you up)
`
p = e + f + e + g + e + h + e + i
q = p + e + j + e + k
rrollingCypher = d =>
    d.reduce((a, [b,c]) => a +
`We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
${m + q + l}And if you ask me how I'm feeling
Don't tell me you're too blind to see
${q + q + o}(Ooh) ${o + l + m + q + q + p}`
    .split(`
`)[b][c]
    , '')