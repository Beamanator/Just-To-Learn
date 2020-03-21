import UIKit

class Spaceship {
    
    var fuelLevel = 100
    var name = ""
    
    func cruise() {
        // Code to initiate cruising
        print("Cruising is initiated for \(name)")
    }
    
    func thrust() {
        // Code to initiate rocket thrusters
        print("Rocket thrusters initiated for \(name)")
    }
    
}

var myShip = Spaceship()
myShip.name = "Alex"
myShip.cruise()
