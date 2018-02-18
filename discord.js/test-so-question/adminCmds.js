function admin1() {
    console.log('in admin 1 command');
    // your command code here
}

function admin2() {
    console.log('in admin 2 command');
    // your command code here
}

module.exports = {
    checkAdminCmd: function(message) {
        let command = message.content.toUpperCase();
        let found = false;

        switch(command) {
            case '?ADMIN1':
                found = true;
                admin1();
                break;

            case '?ADMIN2':
                found = true;
                admin2();
                break;
        }

        return found;
    }
};