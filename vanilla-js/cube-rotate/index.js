var cube = document.querySelector(".cube");
var radioGroup = document.querySelector(".radio-group");
var currentClass = "";

function changeSide() {
    var checkedRadio = radioGroup.querySelector(":checked");
    var showClass = "show-" + checkedRadio.value;
    if (currentClass) {
        cube.classList.remove(currentClass);
    }
    cube.classList.add(showClass);
    currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener("change", changeSide);
cube.addEventListener("transitionend", function () {
    console.log("transition end?");
});

let sides = [document.querySelector(".cube2.cube2__face--front").style];

document.querySelector("#up").addEventListener("click", () => {
    console.log("up");
});
document.querySelector("#down").addEventListener("click", () => {
    console.log("down");
});
