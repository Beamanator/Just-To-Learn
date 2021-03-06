const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        // if user is an admin, show admin elements
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        // add account info
        db.collection('users').doc(user.uid).get()
        .then(doc => {
            const html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().bio}</div>
                <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        });

        // toggle UI elements
        loggedInLinks.forEach(item => { item.style.display = 'block'; });
        loggedOutLinks.forEach(item => { item.style.display = 'none'; });
    } else {
        // hide admin elements
        adminItems.forEach(item => item.style.display = 'none');
        // hide account info
        accountDetails.innerHTML = '';
        // toggle UI elements
        loggedInLinks.forEach(item => { item.style.display = 'none'; });
        loggedOutLinks.forEach(item => { item.style.display = 'block'; });
    }
}

// setup guides
const setupGuides = (data) => {
    // data exists! show it!
    if (data.length > 0) {
        let html = '';
    
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
                <li>
                    <div class="collapsible-header grey lighten-4">${guide.title}</div>
                    <div class="collapsible-body white">${guide.content}</div>
                </li>
            `;
            html += li;
        });
    
        guideList.innerHTML = html;
    }
    // no data - show message
    else {
        guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    // initialize all modals (M is materialize library)
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    // initialize all collapsible elements
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});