// -   Note: We can't use the `"IN"` condition in the export, since there's no documentation on how it works. Therefore, use the below code to automatically add lots of `"ID" "equals" "<id>` conditions
//     -   To get the below code to work, you'll have to manually set these fields:
//         1. Choose what to export => to "Member"
//         1. Element to "ID"
//             - This triggers the "Role" dropdown to populate with elements - somehow I couldn't get this to populate by programmatically triggering the "change" / "onchange" event of the Element dropdown
//     -   Code to import rules / conditions into Web CMS -> export plugin:

(() => {
    try {
        uniqueMembers;
    } catch (e) {
        console.warn("uniqueMembers must be pre-populated!");
        console.error(e);
        return;
    }

    let elementElem = document.querySelector(
            "div.wpie_content_data_rule_wrapper select.wpie_content_data_rule_fields"
        ),
        ruleElem = document.querySelector(
            "div.wpie_content_data_rule_wrapper select.wpie_content_data_rule_select"
        ),
        valueElem = document.querySelector(
            "div.wpie_content_data_rule_wrapper input.wpie_content_data_rule_value"
        );

    let addFilterBtn = document.querySelector(
            "div.wpie_content_data_rule_btn_wrapper a.wpie_save_add_rule_btn"
        ),
        orLogicRadios;

    const CONSTS = {
        ELEMENT_VALUES: {
            ID:
                "%7B%22name%22%3A%22ID%22%2C%22type%22%3A%22id%22%2C%22isDefault%22%3Atrue%7D",
        },
        RULE_VALUES: {
            EQUALS: "equals",
        },
    };

    let index = 0,
        len = uniqueMembers.length;
    let maxImport = -1;
    let intervalId = setInterval(() => {
        let postId = uniqueMembers[index];

        if (
            !uniqueMembers ||
            !Array.isArray(uniqueMembers) ||
            (maxImport > 0 && maxImport < len && index >= maxImport) ||
            index >= len
        ) {
            clearInterval(intervalId);
            console.log("done adding! Time to set all 'OR' conditions");
            return;
        }

        console.log(
            `adding elem (${postId}) #`,
            index,
            " of ",
            maxImport > 0 ? maxImport : len
        );

        elementElem.value = CONSTS.ELEMENT_VALUES.ID;
        ruleElem.value = CONSTS.RULE_VALUES.EQUALS;
        valueElem.value = postId;

        index += 1;

        // click 'Plus'
        addFilterBtn.click();
    }, 2000);
})();

/**
         * -   Note: You may have to manually set one checkbox to "AND", then back to "OR" for the "Total Records Found" to properly catch all changes

1.  Next, run this to set all logic gates to "OR":

    -   Note: for ~150 records and above, it takes sometimes over 10 seconds for browser to respond after running this
         */

(() => {
    let orLogicRadios = document.querySelectorAll(
        'input[type="radio"].wpie_rule_condition_option[value="OR"]'
    );
    orLogicRadios.forEach((e) => {
        e.click();
    });
})();
