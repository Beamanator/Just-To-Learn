import UIKit

var str = "Hello, playground"

// basic function
func sayHello() {
    print("hi there sir")
}

sayHello();

// Function with parameters
func sayHelloTo(name:String, age:Int) {
    print("Hello \(name), age \(age)")
    
}

sayHelloTo(name: "Alex", age: 22)

// Function with return value
func add4To(x:Int) -> Int {
    return x + 4;
}
var result = add4To(x: 5)
print(result)
