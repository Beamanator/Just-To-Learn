/**
 * 1.  Open Simple history tab in cms:
    -   100 search results per page (maximum)
    -   Message Types: `"Posts Updated"`
1.  In console, do `updatedMembers = []` to initialize that variable
1.  On each page of results, run:
 */
[
    ...document.querySelectorAll(
        "ul.SimpleHistoryLogitems li .SimpleHistoryLogitem__secondcol .SimpleHistoryLogitem__text"
    ),
].forEach((textElem) => {
    let innerText = textElem.innerText;
    if (!innerText.startsWith("Updated member")) return;

    let a = textElem.querySelector("a");
    let href = a.href;
    updatedMembers.push(href.split("post=")[1].split("&")[0]);
});
updatedMembers;

// This will only add updated Members to the array `updatedMembers`, and it will also print out the current list of members (per page) so you can see progress as you go

// 1.  Go to next page, and repeat the last step, until there's no more results to add to `updatedMembers`
// 1.  Now that you're done, get unique ids with:

uniqueMembers = [...new Set(updatedMembers)];
