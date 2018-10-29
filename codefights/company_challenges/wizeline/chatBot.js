/**
 * Name: Chat Bot
 * Difficulty: Medium (40 min)
 * Time: 28:17
 * Date: 29 Oct 2018
 * Note: I was literally stuck on one the placement of one line (lastMatchIndex = wordI;)
 * -> for 20 minutes
 */
function chatBot(conversations, currentConversation) {
    // init 'global' variables
    let convoIndex = -1, nextWordIndex = -1, maxMatches = 0;
    
    // loop through all conversation arrays
    conversations.forEach((convo, convoI) => {
        // init variables for this specific conversation
        let matches = 0, lastMatchIndex = -1, matchingWords = [];
        
        // loop through all words in this conversation
        convo.forEach((word, wordI) => {
            // check if word is in currentConversation
            if (currentConversation.includes(word)) {
                // && hasn't matched already
                if (!matchingWords.includes(word)) {
                    matches++;
                    matchingWords.push(word);
                }
                // find latest match, so always update lastMatchIndex
                // -> this line got me for about 20 minutes
                lastMatchIndex = wordI;
            }
        });
        
        // if more matches found than max, update vars
        if (matches > maxMatches) {
            convoIndex = convoI;
            nextWordIndex = lastMatchIndex;
            maxMatches = matches;
        }
    });
    
    // if no changes needed, return current convo
    if (maxMatches < 1) return currentConversation;

    // at least 1 match found, so add new words from converation
    return currentConversation.concat(
        conversations[convoIndex].slice(nextWordIndex + 1)
    );
}
