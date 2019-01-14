const guideList = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {
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

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    // initialize all modals (M is materialize library)
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    // initialize all collapsible elements
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});