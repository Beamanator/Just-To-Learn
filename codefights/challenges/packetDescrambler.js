/**
 * Name: Packet Descrambler
 * Date: 9 Dec 2020
 * Difficulty: 2000 (Medium)
 * Solution length: 673 chars
 */

function packetDescrambler(seq, fragmentData, n) {
    let maxFragNum = -1;
    let frags = seq
        .reduce(
            (acc, num, i) => {
                // check if current num is maximum - store max for later
                if (num > maxFragNum) maxFragNum = num;
                // initialize array at this index
                if (!acc[num]) acc[num] = [];
                // add this character to frags, at sequence number's index
                acc[num].push(fragmentData[i]);
                return acc;
            },
            // initialize an array full of 'nulls' so later we can
            // -> search for nulls to maybe find missing fragments (failing case)
            Array(seq.length).fill(null)
        )
        // remove null elements AFTER the last fragment (we don't
        // want to include final 'null's when searching for missing fragments)
        .filter((e, i) => (i >= maxFragNum ? !!e : true));

    // if there's no fragments or found missing (null) fragment, fail
    if (maxFragNum === -1 || frags.includes(null)) return "";

    let fail = false;

    // get characters in each fragment
    let str =
        // join all characters into a string
        frags.map((frag) => {
            let maxCount = 0,
                maxChar = "",
                map = {};
            // set max count & char in each fragment
            frag.forEach((char) => {
                // initialize this character's count in map
                if (!map[char]) map[char] = 0;
                // add 1 to this character's count
                map[char] = map[char] + 1;
                // if this char has showed up max times,
                // -> set as max count and max char
                if (map[char] > maxCount)
                    (maxCount = map[char]), (maxChar = char);
            });
            // return max char depending on count
            if (maxCount > n / 2) return maxChar;
            // if max count isn't over 50%, fail
            else return (fail = true);
        }).join``;

    if (
        fail ||
        // output str has '#' not in the end
        str.substr(0, str.length - 1).includes("#") ||
        // str doesn't end with '#'
        !str.endsWith("#")
    )
        return "";

    return str;
}
