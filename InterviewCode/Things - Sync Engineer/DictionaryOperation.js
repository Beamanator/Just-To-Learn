/**
 * Implementation by: Alex Beaman
 * Date: 11 September 2018
 * Purpose: Completing Things' coding challenge
 * 
 * The code I used below is in the JavaScript language, using ES6 syntax.
 * I ran this code in the website 'JS Bin'
 * Here's where you can find my code: https://jsbin.com/rinaqoqaxo/edit?js,console
 * Note: You may have to change the js editor to use "ES6 / Babel"
 */
class DictionaryOperation {
    constructor() {
        // Create ontainer for all operations in this DictionaryOperation.
        this.ops = {};
        // Create container for "types" of dictionary operations.
        this.opTypes = {
            CREATE: 'CREATE',
            UPDATE: 'UPDATE',
            DELETE: 'DELETE'
        };
    }
    
    /**
     * Make dictionary's operations available to outside resources.
     */
    get_operations() { return this.ops; }
    
    /**
     * Handle error throwing. 
     * For now, this is just a basic console error, but since all error handling
     *  comes here, this can be made more complex if desired.
     * 
     * @param {string} errorMsg - message (to be displayed to end user) 
     *                            explaining the error that occurred.
     */
    throw_error(errorMsg) { console.error(errorMsg); }
  
    /**
     * Handle record create operation.
     * Creates or updates an object on the 'ops' container, describing the operation
     *  to do with the given key (CREATE a new 'key' and store the value 'value').
     * 
     * @param {string|number} key - location in Dictionary where you would like to add
     *                              the 'value'
     * @param {*} value - data to be added in specified location ('key') of the Dictionary
     */
    record_create(key, value) {
        this.ops[key] = {
            // set key's latest operation to 'create'
            type: this.opTypes.CREATE,
            value: value
        };
    }
  
    /**
     * Handle record update operation.
     * Creates or updates an object on the 'ops' container, describing the operation
     *  to do with the given key (UPDATE the 'key' with the value 'value').
     * 
     * @param {string|number} key - location in Dictionary where you would like to update
     *                              the 'value'
     * @param {*} value - data to be added in specified location ('key') of the Dictionary
     */
    record_update(key, value) {
        this.ops[key] = {
            // set key's latest operation to 'update'
            type: this.opTypes.UPDATE,
            value: value
        };
    }
  
    /**
     * Handle record delete operation.
     * Creates or handles an object on the 'ops' container, describing the operation
     *  to do with the given key (DELETE the 'key' and its value).
     * 
     * @param {string|number} key - location in Dictionary where you would like to delete
     *                              the 'value'
     */
    record_delete(key) {
        this.ops[key] = {
            // set key's latest operation to 'delete'
            type: this.opTypes.DELETE,
            value: null
        };
    }
  
    /**
     * Applies Dictionary operations to given dictionary 'dict_'.
     * Converts this DictionaryOperation's operations container 'this.ops' into an array,
     * then loops through each operation and acts according to the specific operation.
     * 
     * 'this.opTypes.CREATE'
     * -> Creates new dictionary entry.
     * -> Note: If given key already exists in dictionary, throw error (the operation was
     *          supposed to CREATE a new entry, not update an existing entry). This is just
     *          how I interpreted the challenge, but could definitely be changed.
     * 'this.opTypes.UPDATE'
     * -> Updates existing dictionary entry.
     * -> Note: If given key does not exist in dictionary, throw error (the operation was
     *          supposed to UPDATE an existing entry, not create a new entry). This is just
     *          how I interpreted the challenge, but could definitely be changed.
     * 'this.opTypes.DELETE'
     * -> Deletes dictionary entry.
     * -> Note: This operation doesn't care if entry exists at this point or not.
     * 
     * @param {object} dict_ - In JavaScript, this dictionary is a standard Object.
     */
    apply_to_dict(dict_) {
        // Check that 'dict_' exists
        if (!dict_) {
            this.throw_error('Error: cannot apply operations to nonexistent dictionary!');
            return;
        }

        // Dictionary exists, so apply operations to dictionary.
        // Note: In the 'forEach' parameter, I used array & object destructuring. It may
        //  look kinda weird at first, but now that I've gotten used to it, I love it.
        //  It prevents you from needing to do something like 'const type = operation.type;'
        //  and 'const value = operation.value;'.
        Object.entries(this.ops).forEach(([key, {type, value}]) => {
            // Note: At this point, it's common to make sure the 'key' is in the right format.
            //  This may mean making sure the first letter is capitalized, capitalizing everything,
            //  or making all letters lowercase. This is useful to make sure you don't get
            //  duplicate dictionary entries with the same name, just different cases ("Claire"
            //  and "cLAIRE", for example). I didn't implement this because I felt that the goal
            //  of the challenge was mainly just to implement the given functions. I'm happy
            //  to explain how I would do any of the offered solutions above, if you're interested.

            switch(type) {
                // Note: the parenthesis around 'this.opTypes.CREATE' and '...UPDATE', etc. Are
                //  note necessary, but make the code look a bit nicer in my opinion.
                case (this.opTypes.CREATE):
                    // Note: It's possible to simplify 'if' & 'else' statements by removing the
                    //  curly brackets '{' and '}' since there's only one line of code inside
                    //  each. I'll do that in future 'switch-case' statements just for simplicity.
                    if (dict_[key]) {
                        this.throw_error(`Error: key [${key}] already exists in dict!`);
                    }
                    else {
                        dict_[key] = value;
                    }
                    break;

                case (this.opTypes.UPDATE):
                    if (!dict_[key]) this.throw_error(`Error: no key [${key}] to update!`);
                    else dict_[key] = value;
                    break;

                case (this.opTypes.DELETE):
                    delete dict_[key];
                    break;

                // Handle unmatched operation 'type'. This "should" never happen, but it's
                //  always useful to handle it "just in case"
                default:
                    this.throw_error(`Couldn't match operation type [${type}]`);
            }
        });
    }
  
    /**
     * Appends passed-in DictionaryOperation's operations to this instance's operations.
     * Converts passed-in operations container into an array, then loops through each
     *  operation and adds / updates this instance's 'this.ops' container with the
     *  new operation(s).
     * 
     * Note: As mentioned a bit in the description of 'apply_to_dict', the following
     *  implementation is pretty simple, but it's how I interpreted the challenge. It would
     *  be possible to react to appended operations based on current operations, if desired.
     *  For example:
     *   If the current DictionaryOperation has this operation:
     *   "Suzy": {
     *       type: 'CREATE',
     *       value: 9
     *   }
     *   but the passed-in 'operation' has this operation:
     *   "Suzy": {
     *       type: 'UPDATE',
     *       value: 12
     *   }
     *   The program could just replace the current operation 'CREATE' with the appended
     *   operation 'UPDATE' (which is my current implementation) or it could try to be 
     *   "smart" and react to the difference in operations (maybe throwing a warning, maybe 
     *   just making sure the new operation makes sense).
     * 
     * @param {DictionaryOperation} operation - DictionaryOperation instance containing operations
     *                                          that should be added to this instances' operations
     *                                          container.
     */
    append(operation) {
        // Check that 'operation' exists
        if (!operation) {
            this.throw_error('Error: cannot append operations from nonexistent DictionaryOperation!');
            return;
        }

        // Get operations container from passed-in DictionaryOperation 'operation'.
        const newOps = operation.get_operations();
        
        // Dictionary exists, so apply operations to dictionary.
        // Note: In the 'forEach' parameter, I again used array & object destructuring.
        // Note2: I didn't add a check for existing operations inside newOps since this
        //  'for-loop' will pretty much exit instantly if there aren't any operations.
        Object.entries(newOps).forEach(([key, {type, value}]) => {
            switch(type) {
                case (this.opTypes.CREATE):
                    this.record_create(key, value);
                    break;

                case (this.opTypes.UPDATE):
                    this.record_update(key, value);
                    break;

                case (this.opTypes.DELETE):
                    this.record_delete(key);
                    break;

                default:
                    this.throw_error(`Couldn't match appended operation type [${type}]`);
            }
        });
      
    }
};

// Create 1st sample dictionary for Part 1
testDict1 = {
    "Bob": 10,
    "Claire": 45,
    "Jane": 16,
    "Fred": 26
};

// Create copy of 'testDict1' for Part 2
testDict2 = {...testDict1};

// Part 1: testing 'record_create', 'record_update', 'record_delete', 'apply_to_dict'.
op_A = new DictionaryOperation();
op_A.record_create("Alice", 13);
op_A.record_create("Jim", 14);
op_A.record_update("Bob", 29);
op_A.record_update("Alex", 99);
op_A.record_delete("Claire");
op_A.apply_to_dict(testDict1);

// Output result of Part 1
console.log('New dict:', testDict1);

// Part 2: testing 'append'
op_B = new DictionaryOperation();
op_B.record_create("Jane", 12);
op_B.record_update("Faris", 9);
op_B.record_delete("Alex");
op_A.append(op_B);
op_A.apply_to_dict(testDict2);

// Output result of Part 2
console.log('New dict:', testDict2);
