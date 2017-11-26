$(document).ready(function(){
    
        // add item
        $('form#search').on('submit', function(e){

            let lng = $(this).find('[ref="lng"]').val(),
                lat = $(this).find('[ref="lat"]').val();

            $.ajax({
                type: 'GET',
                url: `/api/ninjas?lng=${lng}&lat=${lat}`,
                success: function(ninjas) {
                    if (!ninjas.length) {
                        ninjas = [{
                            dis: 0,
                            obj: {
                                name: 'None',
                                rank: 'Found',
                                available: false
                            }
                        }];
                    }

                    let liElems = '';

                    for (let ninja of ninjas) {
                        liElems += '<li>' +
                            `<span class="${ninja.obj.available}"></span>` +
                            `<span class="name">${ninja.obj.name}</span>` +
                            `<span class="rank">${ninja.obj.rank}</span>` +
                            `<span class="dist">${Math.floor(ninja.dis / 1000)} km</span>` +
                        '</li>';
                    }

                    $ninjaList = $('ul#ninja-list');
                    
                    // remove all LI tags, then add them back!
                    $ninjaList.empty();
                    $ninjaList.append(liElems);
                }
            });
    
            return false;
        });
    });
    