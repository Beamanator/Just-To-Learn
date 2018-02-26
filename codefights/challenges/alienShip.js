// Name: alienShip
// URL: https://codefights.com/challenge/HopZBCrp2d4y4rPSK
function alienShip(v, y) {
    return 2017 + Math.floor(y/
        parseFloat(Math.sqrt(1 - (v*v)).toPrecision(6))                    
    )
}
