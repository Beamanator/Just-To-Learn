// Name: ringRoads
// URL: https://codefights.com/challenge/scun7gcKEAy6Cxjo3
function ringRoads(innerRing, outerRing, roads, travels) {
    let distHolder = [];
    for (let i = 0; i < travels.length; i++) {
        let startAngle = travels[i][0],
            endAngle = travels[i][1];
        
        let shortDist = 0;

        for (let j = 0; j < roads.length; j++) {
            let roadAngle = roads[j];
            
            let startDiff = getDiff(startAngle, roadAngle),
                endDiff = getDiff(endAngle, roadAngle);
            
            let dist = getDist(startDiff, innerRing, endDiff, outerRing) + (outerRing - innerRing);
            
            if (!shortDist || dist < shortDist)
                shortDist = dist;
        }
        
        distHolder.push(shortDist);
    }
    
    return distHolder;
}

function getDist(s, r1, e, r2) {
    return (Math.PI * r1 * 2 * (s / 360)) +
        (Math.PI * r2 * 2 * (e / 360));
}

function getDiff(a, b) {
    let diff = Math.abs(a - b);
    return diff > 180 ? 360 - diff : diff;
}