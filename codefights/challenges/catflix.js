// Name: catflix
// URL: https://codefights.com/challenge/Jodib8tKfPS6xXP6o
function catflix(shows, limit, name) {
    let mSuccess = `You may watch your shows, ${name}`,
        mFail = `You are not allowed to watch so much TV, ${name}`,
        mOverlap = ` overlap, pick one, ${name}`;
    
    // sort shows by first show start time
    shows.sort(function(a,b) {
        if (a[1] < b[1])
            return -1;
        if (a[1] > b[1])
            return 1;
        return 0;
    });
    
    let totalDuration = 0;
    
    for (let i = 0; i < shows.length; i++) {
        let dur = getDuration(shows[i]);
        
        totalDuration += dur;
                
        if (exceedsLimit(totalDuration, limit))
            return mFail;
        
        if (showsOverlap(shows[i], shows[i+1]))
            return shows[i][0] + ' and ' + shows[i+1][0] + mOverlap;
    }
    
    return mSuccess;
}

function showsOverlap(a, b) {
    if (!b) return false;
    
    if (a[2] < b[1])
        return false;
    return true;
}

function exceedsLimit(dur, limit) {
    let mLimit = (+limit.split(':')[0] * 60) +
        +limit.split(':')[1];
    
    return dur > mLimit;
}

function getDuration(show) {
    let from = show[1],
        to = show[2];
    
    let hfrom = +from.split(':')[0],
        mfrom = +from.split(':')[1];
    
    let hto = +to.split(':')[0],
        mto = +to.split(':')[1];
    
    return (mto - mfrom) + (hto - hfrom) * 60
}
