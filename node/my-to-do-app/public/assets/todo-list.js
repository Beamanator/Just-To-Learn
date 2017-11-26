$(document).ready(function(){

    // add item
    $('form').on('submit', function(){

        var $item = $('form input');
        var todo = {item: $item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });

        return false;
    });

    // delete item
    $('li').on('click', function(){
        // replace spaces ' ' with hyphens
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

});
