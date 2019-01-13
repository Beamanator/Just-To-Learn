// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    // initialize all modals (M is materialize library)
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    // initialize all collapsible elements
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});