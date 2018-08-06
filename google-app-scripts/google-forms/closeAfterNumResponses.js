/**
 * Purpose of this function is to close the a form (not receive
 * any more responses) after receiving a set number of responses.
 * 
 * Notes:
 * 1) the response limit should be set in variable 'responseNumLimit'
 * 2) you can customize the 'form closed' message in variable 'msg'
 * 3) you need to 'activate' this function as a trigger so it will
 *    run each time a form is submitted. To do this, go to:
 *      - Edit -> Current Project's Triggers
 *      - Click 'Add a new trigger'
    *      - in 'Run', select this function name below, 'closeForm'
    *      - in 'Events', select 'From form', then 'On form submit'
 *      - Click 'Save'
 *      - You will probably be prompted to authorize your code to
 *        be able to access your form
 * 4) this code originally came from this Stack Overflow question:
 *    https://webapps.stackexchange.com/questions/56537/setting-maximum-number-of-sign-ups-in-google-forms
 */
function closeForm() {
    // get active form
    var form = FormApp.getActiveForm();
  
    // retrieve number of responses thusfar
    // -> (including latest form submission)
    var currentNumResponses = form.getResponses().length;
 
    // set max number of responses before closing form
    var responseNumLimit = 22;
  
    // check if number of responses has reached the limit
    if ( currentNumResponses >= responseNumLimit ) {
        // set close message
        var msg = "Maximum number of responses has been reached";

        // close the form and set custom form closed message
        form
        .setAcceptingResponses(false)
        .setCustomClosedFormMessage(msg);
    }

    // else, do nothing
    else {}
}